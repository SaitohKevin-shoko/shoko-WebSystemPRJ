{
    let checkCanvas = document.createElement('canvas').getContext('2d');
    let text = '1234567890ABCDEFGHIJKLMNO';

    checkCanvas.font  = `72px monospace`
    let initSize  = checkCanvas.measureText(text).width

    //※特定要素のフォントに「メイリオ」を指定し、要素のサイズが変化するかを確認する
    //変化する場合、フォントが適用されている = 「メイリオ」フォントが存在する と判定
    checkCanvas.font  = `72px メイリオ, monospace`;

    const element = document.querySelector(':root');
    element.style.setProperty("--text-centering-scalar", '0.1em');

}