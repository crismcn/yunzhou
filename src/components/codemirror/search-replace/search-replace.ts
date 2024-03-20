import { ref } from 'vue'
import { EditorView } from 'codemirror'
import { closeSearchPanel, openSearchPanel, selectNextOccurrence, setSearchQuery, SearchQuery, RegExpCursor } from '@codemirror/search'

interface SEARCHTYPE {
  searchText: string
  replaceText: string
  regexp: boolean
  caseSensitive: boolean
  wholeWord: boolean
  isReplace: boolean
}
export const search = ref<SEARCHTYPE>({
  searchText: '',
  replaceText: '',
  regexp: false,
  caseSensitive: false,
  wholeWord: false,
  isReplace: false,
})

interface RESULTTYPE {
  current: number
  total: number
}
export const results = ref<RESULTTYPE>({
  current: 0,
  total: 0,
})

export const useSearchReplace = () => {
  const onOpenSearchPanel = (e: EditorView) => {
    openSearchPanel(e)
  }
  const onCloseSearchPanel = (e: EditorView) => {
    // search.value = {
    //   searchText: '',
    //   replaceText: '',
    //   regexp: false,
    //   caseSensitive: false,
    //   wholeWord: false,
    //   isReplace: false,
    // }
    closeSearchPanel(e)
  }

  // 查找内容
  const onSearch = (e: EditorView) => {
    const { searchText, replaceText, caseSensitive, wholeWord, regexp } = search.value
    const query = new SearchQuery({
      search: searchText,
      replace: replaceText,
      caseSensitive: caseSensitive,
      regexp: regexp,
      wholeWord: wholeWord,
    })
    e.dispatch({ effects: setSearchQuery.of(query) })
    onCountSearchResult(e)
  }

  // 统计搜索结果
  const onCountSearchResult = (e: EditorView) => {
    const searchText = search.value.searchText
    const { from, to } = e.state.selection.main
    const regexString = search.value.wholeWord ? `\\b${searchText}\\b` : searchText
    const cursor = new RegExpCursor(e.state.doc, regexString, {
      ignoreCase: !search.value.caseSensitive,
    })
    const result = []
    let i = 0
    while (searchText && !cursor.next().done) {
      ++i
      if (from == cursor.value.from && to == cursor.value.to) {
        results.value.current = i
      }
      result.push(cursor.value)
    }
    results.value.total = result.length
  }

  const onSelectNextOccurrence = (e: EditorView) => {
    selectNextOccurrence(e)
    const selection = e.state.selection.main
    const selectedText = e.state.doc.sliceString(selection.from, selection.to)
    if (selectedText) search.value.searchText = selectedText
  }

  const searchKeymap = [
    {
      key: 'Ctrl-f',
      run: (e: EditorView) => {
        onSelectNextOccurrence(e)
        openSearchPanel(e)
        onCountSearchResult(e)
        return true
      },
    },
  ]

  return {
    onCloseSearchPanel,
    onOpenSearchPanel,
    onSearch,
    onCountSearchResult,
    searchKeymap,
  }
}
