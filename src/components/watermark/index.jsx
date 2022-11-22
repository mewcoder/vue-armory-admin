import './style.css';
import { defineComponent, onMounted, ref } from 'vue';
import html2canvas from 'html2canvas';
import { dataURLtoBlobUrl } from '@/utils';

async function fetchImg(dom) {
  const imgList = dom.querySelectorAll('img');
  if (!imgList.length) return;
  console.log(imgList);
  const fetchList = [...imgList].map(
    (img) =>
      new Promise((reslove) => {
        img.onload = () => reslove();
      })
  );
  await Promise.all(fetchList);
  return;
}

async function renderImg(dom) {
  await fetchImg(dom);
  const canvas = await html2canvas(dom, {
    allowTaint: true,
    useCORS: true,
    scrollX: 0,
    scrollY: 0,
    backgroundColor: null
  });
  const base64 = canvas.toDataURL('image/png');
  return dataURLtoBlobUrl(base64);
}

export default defineComponent({
  name: 'WaterMark',
  setup(_, { slots }) {
    const bgurl = ref('');

    onMounted(async () => {
      bgurl.value = await renderImg(canvasRef.value);
    });

    const canvasRef = ref(null);

    return () => (
      <div class="a-watermark">
        {bgurl.value ? (
          <div
            class="a-watermark__wrapper"
            style={{ background: `url('${bgurl.value}')` }}
          ></div>
        ) : (
          <div ref={canvasRef} class="a-watermark__canvas">
            {slots.default()}
          </div>
        )}
      </div>
    );
  }
});
