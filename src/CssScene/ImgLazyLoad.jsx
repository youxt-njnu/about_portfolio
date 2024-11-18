import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from '@heroicons/react/16/solid'
import Compressor from 'compressorjs'

import { useEffect, useRef, useState } from 'react'
import { images } from '../MapboxDemos/MilkStory/images'

const ImgLazyLoad = () => {
  const [plan, setPlan] = useState(0);
  const imgRef = Array.from({ length: images.length }).map(() => useRef(null));
  const loadRef = useRef(null);

  useEffect(() => {
    if (plan === 1) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // console.log(entry.intersectionRatio);
            let img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
          }
        })
      })

      imgRef.forEach(ele => {
        ele.current && observer.observe(ele.current);
      })
    }

    if (plan === 2) {
      images.forEach((ele, idx) => {
        fetch(ele)
          .then(res => res.blob())
          .then(res => {
            new Compressor(res, {
              quality: 0.6,
              maxWidth: 600,
              maxHeight: 800,
              success (result) {
                let url = URL.createObjectURL(result);
                imgRef[idx].current.src = url;
              },
              error (err) {
                console.log("error in compressor:", err);
              }
            })
          })
          .catch(err => console.log("error in fetch:", err));
      })
    }

    // 虽然但是，因为前九张图片切换的时候并不能马上加载出来，而loadRef首先加载出来，所以就直接触发了下面的observer
    if (plan === 3) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          images.forEach((ele, idx) => {
            idx > 10 && (imgRef[idx].current.src = ele);
          });
          observer.unobserve(loadRef.current);
        }
      })
      loadRef.current && observer.observe(loadRef.current);

    }

  }, [plan]); // 需要根据plan数值来进行懒加载

  return (
    <div className='absolute flex w-screen top-20 flex-col items-center'>
      <header className='flex w-full items-center justify-between border-b-2 border-b-black shadow-xl'>
        <div className='ml-8 font-sans font-bold text-lg'>图片懒加载</div>
        <div className="mr-8 text-right">
          <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
              不同方案
              <ChevronDownIcon className="size-4 fill-white/60" />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="w-52 origin-top-right rounded-xl border border-gray-800 bg-gray-700 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none"
            >
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10 justify-end" onClick={() => setPlan(0)}>
                  loading="lazy"
                  <PencilIcon className="size-4 fill-white/30" />
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10 justify-end" onClick={() => setPlan(1)}>
                  IntersectionObserver
                  <Square2StackIcon className="size-4 fill-white/30" />
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10 justify-end" onClick={() => setPlan(2)}>
                  图片压缩
                  <ArchiveBoxXMarkIcon className="size-4 fill-white/30" />
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10 justify-end" onClick={() => setPlan(3)}>
                  无限滚动
                  <TrashIcon className="size-4 fill-white/30" />
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10 justify-end" onClick={() => setPlan(4)}>
                  其他
                  <TrashIcon className="size-4 fill-white/30" />
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </header>
      <div>
        {
          plan === 0 && images.map((element, index) => (
            <img src={element} alt="" key={index} className="w-full p-2" loading='lazy' />
          ))
        }
      </div>
      {plan === 1 && (
        <div>
          <p> {`在vue里可以使用@vueuse/core里的{useIntersectionObserver}，实习中使用过这个实现dom进入视口触发对应动画。`} </p>
          <p>{`useIntersectionObserver(refContent, ([{ isIntersecting }]) => {
    isVisible.value = isIntersecting; });` }</p>
          <p>其中refContent指向了对应的dom，isIntersecting会监听查看是否ref的dom进入了视口，同步修改isVisible的boolean值</p>

          <a href="https://ruanyifeng.com/blog/2016/11/intersectionobserver_api.html">补充教程链接</a>
          {
            images.map((element, idx) => (
              <img ref={imgRef[idx]} data-src={element} alt={idx} key={idx} className="w-full p-2" />
            ))
          }

        </div>
      )}
      {plan === 2 && (
        <div>
          <p>使用图片压缩工具，或者在服务端进行图片压缩</p>
          <p>实习中使用过compressorjs实现用户上传图片中进行图片压缩，压缩后传给后端存储；</p>
          {
            images.map((element, idx) => (
              <img ref={imgRef[idx]} alt={idx} key={idx} className="w-full p-2" />
            ))
          }
        </div>
      )}
      {
        plan === 3 && (
          <div>
            <p>分页加载/无限滚动：滚动到页面底部的时候，再加载更多图片；下方是实现的无限滚动</p>
            {
              images.map((ele, idx) => (
                <div>
                  {idx < 10 && <img src={ele} alt={idx} key={idx} className="w-full p-2" />}
                  {idx === 10 && <p ref={loadRef} >-------------加载更多-------------------</p>}
                  {idx > 10 && <img ref={imgRef[idx]} alt={idx} key={idx} className="w-full  p-2" />}
                </div>
              ))
            }
          </div>

        )
      }
      {
        plan === 4 && (
          <div>
            <div>* 使用CDN（内容分发网络），把图片缓存在里客户端较近的服务器上；</div>
            <div>* 使用缩略图，当用户点击的时候再加载全图；</div>
            <div>* 虚拟滚动，类似于懒加载，可以使用ElementUI等UI库来实现；</div>
          </div>
        )
      }
    </div >
  )
}

export default ImgLazyLoad