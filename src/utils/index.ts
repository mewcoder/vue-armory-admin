export function dataURLtoBlobUrl(dataurl: string) {
  const arr = dataurl.split(',');
  const mime = (arr[0] as any).match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return URL.createObjectURL(new Blob([u8arr], { type: mime }));
}

export function addMockList(target: HTMLElement) {
  const total = 1000;
  const step = 100;
  let index = 0;
  const add = () => {
    if (index < total) {
      requestAnimationFrame(() => {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < step; i++) {
          const div = document.createElement('div');
          div.innerText = 'msg' + index++;
          fragment.appendChild(div);
        }
        target.appendChild(fragment);
        index += step;
        add();
      });
    }
  };
  add();
}
