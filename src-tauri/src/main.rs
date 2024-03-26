// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn close_splashscreen(window: Window) {
    // Close splashscreen
    window
        .get_window("splashscreen")
        .expect("no window labeled 'splashscreen' found")
        .close()
        .unwrap();
    // Show main window
    window
        .get_window("main")
        .expect("no window labeled 'main' found")
        .show()
        .unwrap();
}

use tauri::{Manager, Window};
use tray::*;

use crate::utils::set_window_shadow;
mod tray;
mod utils;
fn main() {
    tauri::Builder::default()
        .system_tray(tauri::SystemTray::new())
        .setup(|app| {
            set_window_shadow(app);
            update_tray_menu(app.app_handle(), "zh_CN".to_string());
            Ok(())
        })
        .on_system_tray_event(tray::handler) // ✅ 注册系统托盘事件处理程序
        .invoke_handler(tauri::generate_handler![
            close_splashscreen,
            update_tray_menu
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
