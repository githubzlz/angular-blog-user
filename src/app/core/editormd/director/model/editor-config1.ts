export class EditorConfig1 {
  constructor() {}
  public width = '100%';
  public height = '730';
  public path = 'assets/editor/lib/';

  public editorTheme = 'base16-light';
  public previewTheme = 'light';

  public codeFold: true;
  public searchReplace = true;
  public toolbar = true;
  public toolbarIcons = [
    'undo',
    'redo',
    '|',
    'bold',
    'del',
    'italic',
    'quote',
    'ucwords',
    'uppercase',
    'lowercase',
    '|',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    '|',
    'list-ul',
    'list-ol',
    'hr',
    '|',
    'myIcon1',
    'link',
    'reference-link',
    'myIcon3',
    'code',
    'preformatted-text',
    'code-block',
    'table',
    'datetime',
    'html-entities',
    'pagebreak',
    '|',
    'goto-line',
    'watch',
    'preview',
    'fullscreen',
    'clear',
    'search',
    '|',
    'help',
    'info',
    'myIcon2',
  ];
  public toolbarIconTexts = {
    myIcon1:
      '<button style=" background: none;border: none; background: none" id="md-summary">摘</button>',
    myIcon2:
      '<button style=" background: none;border: none; background: none">暂存</button>',
    myIcon3:
      '<button style=" background: none;border: none; background: none">图片</button>',
  };
  public toolbarHandlers: any;
  public autoFocus = false;
  public taskList = true;
  public tex = true;
  public readOnly = false;
  public tocm = true;
  public watch = true;
  public previewCodeHighlight = true;
  public saveHTMLToTextarea = true;
  public markdown = '';
  public flowChart = true;
  public syncScrolling = true;
  public sequenceDiagram = true;
  public crossDomainUpload = true;
  public placeholder = '欢迎使用editor.md编辑你的文章';
  // #### Default theme

  // - Editor.md theme : `default`
  // - Preview area theme : `default`
  // - Editor area theme : `default`

  // > Recommend `dark` theme.

  // #### Recommend editor area themes

  // - ambiance
  // - eclipse
  // - mdn-like
  // - mbo
  // - monokai
  // - neat
  // - pastel-on-dark

  // #### Editor area themes

  // - default
  // - 3024-day
  // - 3024-night
  // - ambiance
  // - ambiance-mobile
  // - base16-dark
  // - base16-light
  // - blackboard
  // - cobalt
  // - eclipse
  // - elegant
  // - erlang-dark
  // - lesser-dark
  // - mbo
  // - mdn-like
  // - midnight
  // - monokai
  // - neat
  // - neo
  // - night
  // - paraiso-dark
  // - paraiso-light
  // - pastel-on-dark
  // - rubyblue
  // - solarized
  // - the-matrix
  // - tomorrow-night-eighties
  // - twilight
  // - vibrant-ink
  // - xq-dark
  // - xq-light
}
