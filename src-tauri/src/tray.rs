use tauri::{
    AppHandle, CustomMenuItem, Manager, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem,
    SystemTraySubmenu,
};

#[derive(Clone, serde::Serialize)]
struct Payload {
    t: String,
    v: String,
}

#[tauri::command]
pub fn update_tray_menu(app_handle: tauri::AppHandle, lang: String) {
    let tray_handle = app_handle.tray_handle();
    tray_handle
        .set_menu(match lang.as_str() {
            "en_US" => tray_menu_en_us(),
            "zh_CN" => tray_menu_zh_cn(),
            _ => tray_menu_zh_cn(),
        })
        .unwrap();
}

fn tray_menu_en_us() -> tauri::SystemTrayMenu {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let show = CustomMenuItem::new("show".to_string(), "Show");
    let lock = CustomMenuItem::new("lock".to_string(), "Lock");
    SystemTrayMenu::new()
        .add_submenu(SystemTraySubmenu::new(
            "Language",
            SystemTrayMenu::new()
                .add_item(CustomMenuItem::new("lang_en_US".to_string(), "English").selected())
                .add_item(CustomMenuItem::new("lang_zh_CN".to_string(), "Chinese")),
        ))
        .add_submenu(SystemTraySubmenu::new(
            "Themes",
            SystemTrayMenu::new()
                .add_item(CustomMenuItem::new("theme_auot".to_string(), "Auto").selected())
                .add_item(CustomMenuItem::new("theme_light".to_string(), "Light"))
                .add_item(CustomMenuItem::new("theme_dark".to_string(), "Dark")),
        ))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(lock)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(show)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit)
}

fn tray_menu_zh_cn() -> tauri::SystemTrayMenu {
    let quit = CustomMenuItem::new("quit".to_string(), "退出");
    let show = CustomMenuItem::new("show".to_string(), "显示");
    let lock = CustomMenuItem::new("lock".to_string(), "锁定");
    SystemTrayMenu::new()
        .add_submenu(SystemTraySubmenu::new(
            "语言",
            SystemTrayMenu::new()
                .add_item(CustomMenuItem::new("lang_en_US".to_string(), "英文"))
                .add_item(CustomMenuItem::new("lang_zh_CN".to_string(), "中文").selected()),
        ))
        .add_submenu(SystemTraySubmenu::new(
            "主题",
            SystemTrayMenu::new()
                .add_item(CustomMenuItem::new("theme_auot".to_string(), "自动").selected())
                .add_item(CustomMenuItem::new("theme_light".to_string(), "亮色"))
                .add_item(CustomMenuItem::new("theme_dark".to_string(), "暗色")),
        ))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(lock)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(show)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit)
}

// 托盘事件
pub fn handler(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::LeftClick {
            position: _,
            size: _,
            ..
        } => {
            let app_window = app.get_window("customization").unwrap();
            app_window.unminimize().unwrap();
            app_window.set_focus().unwrap();
            app_window.show().unwrap();
        }
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "lang_en_US" => {
                update_tray_menu(app.app_handle(), "en_US".into());
                app.emit_all(
                    "sys",
                    Payload {
                        t: "lang".into(),
                        v: "en-US".into(),
                    },
                )
                .unwrap();
            }
            "lang_zh_CN" => {
                update_tray_menu(app.app_handle(), "zh_CN".into());
                app.emit_all(
                    "sys",
                    Payload {
                        t: "lang".into(),
                        v: "zh-CN".into(),
                    },
                )
                .unwrap();
            }
            theme if theme.contains("theme_") => {
                let theme_array = ["theme_auot", "theme_light", "theme_dark"];
                for theme_item in theme_array.iter() {
                    let handle = app.tray_handle().get_item(&theme_item);
                    if theme_item == &id {
                        handle.set_selected(true).unwrap();
                    } else {
                        handle.set_selected(false).unwrap();
                    }
                }
                app.emit_all(
                    "sys",
                    Payload {
                        t: "theme".into(),
                        v: id.into(),
                    },
                )
                .unwrap();
            }
            "lock" => {
                // 更新托盘图标
                // app.tray_handle()
                //     .set_icon(tauri::Icon::Raw(
                //         include_bytes!("../icons/toolbox.png").to_vec(),
                //     ))
                //     .unwrap();
                app.emit_all(
                    "sys",
                    Payload {
                        t: "lock".into(),
                        v: "Tauri is awesome!".into(),
                    },
                )
                .unwrap();
            }
            "show" => {
                let app_window = app.get_window("customization").unwrap();
                app_window.unminimize().unwrap();
                app_window.set_focus().unwrap();
                app_window.show().unwrap();
            }
            "quit" => std::process::exit(0),
            _ => {}
        },
        _ => {}
    }
}
