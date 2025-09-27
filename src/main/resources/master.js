// ==UserScript==
// @name         115Master
// @namespace    115Master
// @version      0.3.1
// @author       cbingb666
// @description  115网盘魔法优化: 画质增强 | 视频缩略图 | 在线字幕 | 内置 Jav 信息
// @license      MIT
// @icon         https://115.com/favicon.ico
// @homepage     https://github.com/cbingb666/115master
// @homepageURL  https://github.com/cbingb666/115master
// @source       https://github.com/cbingb666/115master.git
// @supportURL   https://github.com/cbingb666/115master/issues
// @include      https://115.com/?ct*
// @include      https://115.com/?aid*
// @include      https://115.com/web/lixian/master/video/*
// @include      https://dl.115cdn.net/video/token
// @exclude      https://*.115.com/bridge*
// @exclude      https://*.115.com/static*
// @exclude      https://q.115.com/*
// @require      https://fastly.jsdelivr.net/npm/vue@3.5.13/dist/vue.global.prod.js
// @require      https://fastly.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js
// @require      https://fastly.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js
// @require      https://fastly.jsdelivr.net/npm/big-integer@1.6.52/BigInteger.min.js
// @require      data:application/javascript,%3Bwindow.bigInt%3DbigInt%3B
// @require      https://cdn.jsdelivr.net/npm/blueimp-md5@2.19.0/js/md5.min.js
// @require      https://fastly.jsdelivr.net/npm/dayjs@1.11.13/dayjs.min.js
// @require      data:application/javascript,%3Bwindow.dayjs%3Ddayjs%3B
// @require      https://fastly.jsdelivr.net/npm/mux.js@6.3.0/dist/mux.min.js
// @require      data:application/javascript,%3Bwindow.Mux%3Dmuxjs%3B
// @require      https://fastly.jsdelivr.net/npm/hls.js@1.5.20/dist/hls.min.js
// @require      https://cdn.jsdelivr.net/npm/m3u8-parser@7.2.0/dist/m3u8-parser.min.js
// @require      https://fastly.jsdelivr.net/npm/photoswipe@5.4.4/dist/umd/photoswipe.umd.min.js
// @require      data:application/javascript,%3Bwindow.photoswipe%3DPhotoSwipe%3B
// @require      https://fastly.jsdelivr.net/npm/photoswipe@5.4.4/dist/umd/photoswipe-lightbox.umd.min.js
// @require      data:application/javascript,%3Bwindow.PhotoSwipeLightbox%3DPhotoSwipeLightbox%3B
// @require      https://cdn.jsdelivr.net/npm/systemjs@6.15.1/dist/system.min.js
// @require      https://cdn.jsdelivr.net/npm/systemjs@6.15.1/dist/extras/named-register.min.js
// @require      data:application/javascript,%3B(typeof%20System!%3D'undefined')%26%26(System%3Dnew%20System.constructor())%3B
// @resource     icon  https://115.com/favicon.ico
// @connect      115.com
// @connect      webapi.115.com
// @connect      proapi.115.com
// @connect      dl.115cdn.net
// @connect      cdnfhnfile.115cdn.net
// @connect      v.anxia.com
// @connect      115vod.com
// @connect      subtitlecat.com
// @connect      javbus.com
// @connect      javdb.com
// @connect      jdbstatic.com
// @connect      cpats01.115.com
// @connect      missav.ws
// @grant        GM_addStyle
// @grant        GM_cookie
// @grant        GM_info
// @grant        GM_notification
// @grant        GM_openInTab
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// @downloadURL https://update.greasyfork.org/scripts/528348/115Master.user.js
// @updateURL https://update.greasyfork.org/scripts/528348/115Master.meta.js
// ==/UserScript==

(e=>{if(typeof GM_addStyle=="function"){GM_addStyle(e);return}const t=document.createElement("style");t.textContent=e,document.head.append(t)})(` .loading-error[data-v-c2d74d07]{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px;color:#666}.loading-error-icon[data-v-c2d74d07]{width:48px;height:48px;color:#ff4d4f;animation:error-appear-c2d74d07 .3s ease-out}.loading-error-circle[data-v-c2d74d07]{opacity:0;animation:circle-appear-c2d74d07 .3s ease-out .2s forwards;transform-origin:center}.loading-error-cross[data-v-c2d74d07]{opacity:0;animation:cross-appear-c2d74d07 .3s ease-out .4s forwards;transform-origin:center}.loading-error-text[data-v-c2d74d07]{font-size:14px;animation:text-appear-c2d74d07 .3s ease-out .5s both}.loading-error-detail[data-v-c2d74d07]{font-size:12px;color:#999;animation:text-appear-c2d74d07 .3s ease-out .5s both}.loading-error-retry[data-v-c2d74d07]{padding:6px 16px;border:none;border-radius:4px;background:#ff4d4f;color:#fff;font-size:14px;cursor:pointer;transition:all .2s;animation:text-appear-c2d74d07 .3s ease-out .6s both}.loading-error-retry[data-v-c2d74d07]:hover{background:#ff7875}.loading-error-retry[data-v-c2d74d07]:active{background:#d9363e}@keyframes error-appear-c2d74d07{0%{transform:scale(.8);opacity:0}to{transform:scale(1);opacity:1}}@keyframes circle-appear-c2d74d07{0%{stroke-dasharray:0 100;transform:rotate(-90deg);opacity:0}to{stroke-dasharray:100 100;transform:rotate(90deg);opacity:1}}@keyframes cross-appear-c2d74d07{0%{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}@keyframes text-appear-c2d74d07{0%{transform:translateY(-10px);opacity:0}to{transform:translateY(0);opacity:1}}.skeleton[data-v-b6953356]{display:inline-block;position:relative;overflow:hidden;vertical-align:middle;background:#ffffff1a}.skeleton-light[data-v-b6953356]{background:#0000001a}.skeleton-light .skeleton-animated[data-v-b6953356]:after{background:linear-gradient(90deg,#0000,#0000001a,#0000)}.skeleton.circle[data-v-b6953356]{border-radius:50%!important}.skeleton-animated[data-v-b6953356]:after{content:"";position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(90deg,#fff0,#ffffff4d,#fff0);animation:skeleton-loading-b6953356 1.5s infinite}@keyframes skeleton-loading-b6953356{0%{transform:translate(-100%)}to{transform:translate(100%)}}.image-container[data-v-d3ce5714]{display:flex;justify-content:center;align-items:center;width:100%;height:100%}.image-container img[data-v-d3ce5714]{width:100%;height:100%;object-fit:cover}.empty[data-v-a47b59ec]{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 0;color:#666}.empty-image[data-v-a47b59ec]{margin-bottom:16px}.empty-image img[data-v-a47b59ec],.empty-image svg[data-v-a47b59ec]{max-width:100%;height:auto;vertical-align:middle}.empty-description[data-v-a47b59ec]{font-size:14px;line-height:1.6;text-align:center}.empty-footer[data-v-a47b59ec]{margin-top:16px}.ext-info[data-v-46a696f1]{width:100%;font-family:PingFang SC,Microsoft YaHei,sans-serif;padding-left:34px;padding-right:74px}.ext-info .ext-info-container[data-v-46a696f1]{position:relative;min-height:212px;background-color:#f8f8fa;gap:24px;display:flex;padding:16px;border-radius:16px;box-sizing:border-box}.ext-info .ext-info-cover[data-v-46a696f1]{display:flex;align-items:center;justify-content:center;width:267.65px;height:180px;overflow:hidden;border-radius:12px;box-shadow:0 0 10px 1px #0000001a}.ext-info .ext-info-cover a[data-v-46a696f1]{display:block;width:100%;height:100%}.ext-info .ext-info-cover img[data-v-46a696f1]{display:block;width:100%;height:100%;object-fit:cover}.ext-info .ext-info-main[data-v-46a696f1]{flex:1;display:flex;flex-direction:column;gap:20px}.ext-info .ext-info-content[data-v-46a696f1]{display:flex;flex:1;align-items:flex-start}.ext-info .ext-info-content__group[data-v-46a696f1]{display:flex;flex-direction:column;row-gap:12px}.ext-info .ext-info-content__group[data-v-46a696f1]:first-of-type{min-width:160px}.ext-info .ext-info-item[data-v-46a696f1]{display:flex;align-items:flex-start;gap:12px}.ext-info .ext-info-item .ext-info-item-label[data-v-46a696f1]{width:32px;color:#999}.ext-info .ext-info-item .ext-info-item-value[data-v-46a696f1]{display:flex;flex:1;column-gap:8px;flex-wrap:wrap}.ext-info .ext-info-title[data-v-46a696f1]{font-size:18px;font-weight:600}.ext-info .ext-info-title a[data-v-46a696f1]{display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}.ext-info .ext-info-av-number[data-v-46a696f1]{position:absolute;right:16px;bottom:8px;font-size:12px;color:#999;opacity:.3}.ext-info .ext-info-error[data-v-46a696f1],.ext-info .ext-info-empty[data-v-46a696f1]{display:flex;align-items:center;justify-content:center;flex:1}/*! PhotoSwipe main CSS by Dmytro Semenov | photoswipe.com */.pswp{--pswp-bg: #000;--pswp-placeholder-bg: #222;--pswp-root-z-index: 100000;--pswp-preloader-color: rgba(79, 79, 79, .4);--pswp-preloader-color-secondary: rgba(255, 255, 255, .9);--pswp-icon-color: #fff;--pswp-icon-color-secondary: #4f4f4f;--pswp-icon-stroke-color: #4f4f4f;--pswp-icon-stroke-width: 2px;--pswp-error-text-color: var(--pswp-icon-color)}.pswp{position:fixed;top:0;left:0;width:100%;height:100%;z-index:var(--pswp-root-z-index);display:none;touch-action:none;outline:0;opacity:.003;contain:layout style size;-webkit-tap-highlight-color:rgba(0,0,0,0)}.pswp:focus{outline:0}.pswp *{box-sizing:border-box}.pswp img{max-width:none}.pswp--open{display:block}.pswp,.pswp__bg{transform:translateZ(0);will-change:opacity}.pswp__bg{opacity:.005;background:var(--pswp-bg)}.pswp,.pswp__scroll-wrap{overflow:hidden}.pswp__scroll-wrap,.pswp__bg,.pswp__container,.pswp__item,.pswp__content,.pswp__img,.pswp__zoom-wrap{position:absolute;top:0;left:0;width:100%;height:100%}.pswp__img,.pswp__zoom-wrap{width:auto;height:auto}.pswp--click-to-zoom.pswp--zoom-allowed .pswp__img{cursor:-webkit-zoom-in;cursor:-moz-zoom-in;cursor:zoom-in}.pswp--click-to-zoom.pswp--zoomed-in .pswp__img{cursor:move;cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.pswp--click-to-zoom.pswp--zoomed-in .pswp__img:active{cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.pswp--no-mouse-drag.pswp--zoomed-in .pswp__img,.pswp--no-mouse-drag.pswp--zoomed-in .pswp__img:active,.pswp__img{cursor:-webkit-zoom-out;cursor:-moz-zoom-out;cursor:zoom-out}.pswp__container,.pswp__img,.pswp__button,.pswp__counter{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pswp__item{z-index:1;overflow:hidden}.pswp__hidden{display:none!important}.pswp__content{pointer-events:none}.pswp__content>*{pointer-events:auto}.pswp__error-msg-container{display:grid}.pswp__error-msg{margin:auto;font-size:1em;line-height:1;color:var(--pswp-error-text-color)}.pswp .pswp__hide-on-close{opacity:.005;will-change:opacity;transition:opacity var(--pswp-transition-duration) cubic-bezier(.4,0,.22,1);z-index:10;pointer-events:none}.pswp--ui-visible .pswp__hide-on-close{opacity:1;pointer-events:auto}.pswp__button{position:relative;display:block;width:50px;height:60px;padding:0;margin:0;overflow:hidden;cursor:pointer;background:none;border:0;box-shadow:none;opacity:.85;-webkit-appearance:none;-webkit-touch-callout:none}.pswp__button:hover,.pswp__button:active,.pswp__button:focus{transition:none;padding:0;background:none;border:0;box-shadow:none;opacity:1}.pswp__button:disabled{opacity:.3;cursor:auto}.pswp__icn{fill:var(--pswp-icon-color);color:var(--pswp-icon-color-secondary)}.pswp__icn{position:absolute;top:14px;left:9px;width:32px;height:32px;overflow:hidden;pointer-events:none}.pswp__icn-shadow{stroke:var(--pswp-icon-stroke-color);stroke-width:var(--pswp-icon-stroke-width);fill:none}.pswp__icn:focus{outline:0}div.pswp__img--placeholder,.pswp__img--with-bg{background:var(--pswp-placeholder-bg)}.pswp__top-bar{position:absolute;left:0;top:0;width:100%;height:60px;display:flex;flex-direction:row;justify-content:flex-end;z-index:10;pointer-events:none!important}.pswp__top-bar>*{pointer-events:auto;will-change:opacity}.pswp__button--close{margin-right:6px}.pswp__button--arrow{position:absolute;width:75px;height:100px;top:50%;margin-top:-50px}.pswp__button--arrow:disabled{display:none;cursor:default}.pswp__button--arrow .pswp__icn{top:50%;margin-top:-30px;width:60px;height:60px;background:none;border-radius:0}.pswp--one-slide .pswp__button--arrow{display:none}.pswp--touch .pswp__button--arrow{visibility:hidden}.pswp--has_mouse .pswp__button--arrow{visibility:visible}.pswp__button--arrow--prev{right:auto;left:0}.pswp__button--arrow--next{right:0}.pswp__button--arrow--next .pswp__icn{left:auto;right:14px;transform:scaleX(-1)}.pswp__button--zoom{display:none}.pswp--zoom-allowed .pswp__button--zoom{display:block}.pswp--zoomed-in .pswp__zoom-icn-bar-v{display:none}.pswp__preloader{position:relative;overflow:hidden;width:50px;height:60px;margin-right:auto}.pswp__preloader .pswp__icn{opacity:0;transition:opacity .2s linear;animation:pswp-clockwise .6s linear infinite}.pswp__preloader--active .pswp__icn{opacity:.85}@keyframes pswp-clockwise{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.pswp__counter{height:30px;margin-top:15px;margin-inline-start:20px;font-size:14px;line-height:30px;color:var(--pswp-icon-color);text-shadow:1px 1px 3px var(--pswp-icon-color-secondary);opacity:.85}.pswp--one-slide .pswp__counter{display:none}.ext-preview[data-v-36dee46a]{width:100%;height:150px;display:flex;align-items:center;box-sizing:border-box}.ext-preview .ext-preview-video[data-v-36dee46a]{width:100%;height:150px;display:flex;justify-content:center;overflow:hidden;overflow-x:auto;gap:1px}.ext-preview .ext-preview-video[data-v-36dee46a]::-webkit-scrollbar{height:0;width:0}.ext-preview .ext-preview-video .thumb-item[data-v-36dee46a]{height:150px;cursor:zoom-in;text-decoration:none}.ext-preview .ext-preview-video .thumb-item[data-v-36dee46a]:hover{opacity:.9}.ext-preview .ext-preview-video .thumb-item img[data-v-36dee46a]{height:150px;object-fit:cover;object-position:center;vertical-align:top}.list-contents li.with-ext-info{height:auto!important;padding-top:12px;padding-bottom:32px;flex-wrap:wrap;align-content:flex-start}.list-contents li.with-ext-info .ext-info-root{width:100%;position:relative;display:flex;margin-top:16px}.list-contents li.with-actress-info{height:auto!important}.list-contents li.with-actress-info .file-type{top:50%;transform:translateY(-50%);transition:none}.list-contents li.with-actress-info .file-name-wrap{display:flex;align-items:center;flex-direction:row;justify-content:flex-start;height:auto!important;padding-top:12px;padding-bottom:12px}.list-contents li.with-actress-info .file-name-wrap .actress-info-img{width:50px;height:50px;border-radius:50%;object-fit:cover;margin-right:12px;border:3px solid #f1f1f1;box-shadow:0 0 5px #0000001a;background-color:#f1f1f1}.list-contents li.with-ext-preview{height:auto!important;flex-wrap:wrap;align-content:flex-start;padding-top:12px;padding-bottom:32px}.list-contents li.with-ext-preview .ext-preview-root{width:100%;height:100%;position:relative;display:flex;margin-top:16px}.video-operation-tooltip{position:absolute;top:34px;left:50%;transform:translate(-50%);background:#0000004d;color:#fff;padding:8px 12px;border-radius:4px;font-size:12px;text-align:center;pointer-events:none;z-index:1000;-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);width:60%;opacity:0}.video-operation-tooltip.show{transition:opacity .3s ease-in-out;transition-delay:.2s}.user-agent-popup-overlay[data-v-8574f3b4]{position:fixed;top:0;left:0;right:0;bottom:0;background-color:#0009;display:flex;justify-content:center;align-items:center;z-index:10000;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}.popup-main[data-v-8574f3b4]{padding:0 24px 24px}.user-agent-popup[data-v-8574f3b4]{background-color:#fff;border-radius:12px;box-shadow:0 10px 30px #0003;width:550px;max-width:90vw;max-height:90vh;overflow:auto;animation:popup-fade-in-8574f3b4 .3s cubic-bezier(.16,1,.3,1)}.user-agent-popup-header[data-v-8574f3b4]{display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border-bottom:1px solid #eaeaea}.user-agent-popup-header h3[data-v-8574f3b4]{margin:0;font-size:18px;font-weight:600;color:#333}.close-button[data-v-8574f3b4]{background:none;border:none;font-size:24px;cursor:pointer;color:#999;padding:0;line-height:1;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:all .2s ease}.close-button[data-v-8574f3b4]:hover{color:#333;background-color:#f5f5f5}.popup-content[data-v-8574f3b4]{margin:24px 0;display:flex;align-items:flex-start;background-color:#f9f9f9;border-radius:8px;padding:16px}.content-icon[data-v-8574f3b4]{margin-right:16px;color:#2196f3;flex-shrink:0}.number-icon[data-v-8574f3b4]{display:flex;align-items:center;justify-content:center;width:24px;height:24px;background-color:#2196f3;color:#fff;border-radius:50%;font-size:14px;font-weight:600}.content-text[data-v-8574f3b4]{flex:1}.content-text p[data-v-8574f3b4]{line-height:1.6;margin:0 0 8px;color:#444}.content-text p[data-v-8574f3b4]:last-child{margin-bottom:0}.popup-desc[data-v-8574f3b4]{font-size:14px;color:#666;text-align:center;margin-top:24px}.popup-desc p[data-v-8574f3b4]{margin:0 0 8px;font-weight:500}.user-agent-box[data-v-8574f3b4]{background-color:#f5f5f5;border-radius:6px;padding:12px;font-size:12px;color:#666;word-break:break-all;text-align:left;font-family:monospace;border:1px solid #eaeaea}a[data-v-8574f3b4]{color:#2196f3;text-decoration:none;font-weight:500;transition:color .2s}a[data-v-8574f3b4]:hover{color:#0d6efd;text-decoration:underline}@keyframes popup-fade-in-8574f3b4{0%{opacity:0;transform:translateY(30px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}:root{--color-primary: #0084ff;--color-primary-hover: #339dff;--color-primary-alpha: rgba(0, 132, 255, .3)}.icon[data-v-6e980ff6]{width:26px;height:26px;vertical-align:middle;fill:currentColor}.icon[data-v-4cc56796]{width:24px;height:24px;vertical-align:middle;fill:currentColor}._x-popup_10v9c_2{--x-popup-bg-color: rgba(15, 15, 15, .8);--x-popup-bg-blur: 20px;--x-popup-bg-saturate: 180%;--x-popup-padding: 8px;--x-popup-border-radius: 16px;--x-popup-box-shadow: 0 12px 24px rgba(0, 0, 0, .3);z-index:9999;position:relative;padding:var(--x-popup-padding)}._x-popup-bg_10v9c_14{position:absolute;top:0;right:0;bottom:0;left:0;background:var(--x-popup-bg-color);-webkit-backdrop-filter:blur(var(--x-popup-bg-blur)) saturate(var(--x-popup-bg-saturate));backdrop-filter:blur(var(--x-popup-bg-blur)) saturate(var(--x-popup-bg-saturate));box-shadow:var(--x-popup-box-shadow);border-radius:var(--x-popup-border-radius)}._x-popup-content_10v9c_23{position:relative;z-index:1}._x-menu-popup_1yhl2_2{min-width:150px;--x-popup-padding: 8px}._x-menu-content_1yhl2_6{display:flex;flex-direction:column;gap:4px}[data-v-fa8568f8] .menu-item{padding:8px 12px;color:#fff;cursor:pointer;transition:all .2s;font-size:14px;display:flex;align-items:center;justify-content:space-between;border-radius:8px}[data-v-fa8568f8] .menu-item:hover{background:#ffffff1a}[data-v-fa8568f8] .menu-item.active{color:var(--x-player-color-primary, #007aff);background:#007aff1a}[data-v-fa8568f8] .menu-item.active:after{content:"\u2713";margin-left:8px}.playback-rate-button[data-v-85f2a85a]{position:relative}.control-button[data-v-85f2a85a]{display:flex;align-items:center;gap:4px;background:none;border:none;color:#fff;cursor:pointer;padding:4px 8px;font-size:13px;border-radius:4px;transition:background-color .2s}.control-button[data-v-85f2a85a]:hover{background-color:#ffffff1a}.loading-container[data-v-54976e1d]{position:absolute;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;overflow:hidden}.loading-backdrop[data-v-54976e1d]{position:absolute;top:0;left:0;width:100%;height:100%;background:#0f0f0fcc}.loading-effect[data-v-54976e1d]{position:relative;z-index:2;display:flex;justify-content:center;align-items:center;width:100%;height:100%}.loader[data-v-54976e1d]{position:relative;width:48px;height:48px;animation:scale-in-54976e1d .3s ease-out both}.loader-ring[data-v-54976e1d]{position:absolute;border-radius:50%;border:2px solid transparent}.outer[data-v-54976e1d]{width:100%;height:100%;border-top-color:#fffc;border-right-color:#fff9;animation:spin-54976e1d 1.5s linear infinite;box-shadow:0 0 10px #fff3}.inner[data-v-54976e1d]{width:70%;height:70%;top:15%;left:15%;border-bottom-color:#fffc;border-left-color:#fff9;animation:spin-reverse-54976e1d 1s linear infinite;box-shadow:0 0 8px #fff3}@keyframes spin-54976e1d{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes spin-reverse-54976e1d{0%{transform:rotate(0)}to{transform:rotate(-360deg)}}@keyframes scale-in-54976e1d{0%{transform:scale(.5);opacity:0}to{transform:scale(1);opacity:1}}@keyframes fade-in-54976e1d{0%{opacity:0;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0)}to{opacity:1;-webkit-backdrop-filter:blur(20px) saturate(180%);backdrop-filter:blur(20px) saturate(180%)}}.preview-container[data-v-8ae7b92c]{position:absolute;bottom:100%;margin-bottom:10px;pointer-events:none;will-change:transform}.thumbnail-container[data-v-8ae7b92c]{display:flex;position:relative;border-radius:16px;box-shadow:0 2px 8px #0f0f0fb3;overflow:hidden}.thumbnail-container canvas[data-v-8ae7b92c]{background:#0f0f0fe6}.time-tooltip[data-v-8ae7b92c]{text-align:center;margin-top:4px;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.5)}.thumbnail-loading[data-v-8ae7b92c]{position:absolute;top:0;left:0;right:0;bottom:0;background:#00000080;border-radius:16px}.progress-bar[data-v-08b7c1c7]{margin-bottom:10px;position:relative;font-size:13px}.progress-bar-wrapper[data-v-08b7c1c7]{padding:8px 0;cursor:pointer;position:relative}.progress-bar-container[data-v-08b7c1c7]{height:3px;background-color:#fff3;position:relative;transition:height .1s ease}.progress-bar-wrapper:hover .progress-bar-container[data-v-08b7c1c7]{height:5px}.progress-buffer[data-v-08b7c1c7]{position:absolute;height:100%;background-color:#fff6;transition:width .2s ease}.progress-current[data-v-08b7c1c7]{position:absolute;height:100%;background-color:var(--x-player-controller-progress-bar-color);transition:width .1s linear}.progress-current.progress-dragging[data-v-08b7c1c7]{background-color:var(--x-player-controller-progress-bar-color);transition:none}.progress-hover[data-v-08b7c1c7]{position:absolute;height:100%;background-color:var(--x-player-controller-progress-bar-color-hover);pointer-events:none}.progress-handle-container[data-v-08b7c1c7]{position:absolute;height:100%;transform:translate(-50%)}.progress-handle[data-v-08b7c1c7]{position:absolute;top:50%;left:50%;width:13px;height:13px;background-color:var(--x-player-controller-progress-bar-color);border-radius:50%;transform:translate(-50%,-50%) scale(0);transition:transform .1s ease;pointer-events:none}.progress-bar-wrapper:hover .progress-handle[data-v-08b7c1c7],.progress-handle.is-dragging[data-v-08b7c1c7]{transform:translate(-50%,-50%) scale(1)}.progress-handle-original[data-v-08b7c1c7]{background-color:#ffffff80;transform:translate(-50%,-50%) scale(1)!important}.quality-button[data-v-68d7f6dd]{position:relative;padding:6px 12px;color:#fff;cursor:pointer;border-radius:6px;transition:all .2s;font-size:14px;display:flex;align-items:center;gap:4px;-webkit-user-select:none;user-select:none}.quality-button[data-v-68d7f6dd]:hover{background:#ffffff26}.tooltip[data-v-68d7f6dd]{padding:6px 12px;color:#fff;font-size:12px;white-space:nowrap;background:#1c1c1cf2;-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border-radius:6px}[data-v-68d7f6dd] .menu-item{position:relative;padding:8px 12px;color:#fff;cursor:pointer;transition:all .2s;font-size:14px;display:flex;align-items:center;justify-content:space-between;border-radius:6px;margin:2px 0}[data-v-68d7f6dd] .menu-item:hover{background:#ffffff1a}[data-v-68d7f6dd] .menu-item.active{color:var(--x-player-color-primary, #007aff);background:#007aff1a}[data-v-68d7f6dd] .menu-item.active:after{content:"";position:absolute;right:12px;width:16px;height:16px;background-image:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23007aff"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>');background-size:contain;background-repeat:no-repeat;background-position:center}.scroll-tip[data-v-c024fd1d]{position:absolute;left:50%;bottom:0;transform:translate(-50%);z-index:3;opacity:0;visibility:hidden;transition:all .3s ease}.scroll-tip.show[data-v-c024fd1d]{opacity:1;visibility:visible}.scroll-tip-content[data-v-c024fd1d]{display:flex;align-items:center;color:#fff;padding:12px 20px;border-radius:8px}.scroll-tip-content span[data-v-c024fd1d]{margin:4px 0}.icon[data-v-c024fd1d]{font-size:24px;animation:bounce-c024fd1d 1s infinite}@keyframes bounce-c024fd1d{0%,to{transform:translateY(-1px)}50%{transform:translateY(1px)}}._settings-button_vrm1f_2{position:relative;display:inline-block}._settings-popup_vrm1f_7{min-width:200px;padding:12px;border-radius:12px}._settings-content_vrm1f_13{display:flex;flex-direction:column}._chunk_vrm1f_18{display:flex;flex-direction:column;padding:4px 0}._chunk-header_vrm1f_24{display:flex;align-items:center;font-size:13px;font-weight:500;color:#ffffffe6;padding:6px 12px;justify-content:space-between;letter-spacing:.2px}._angle-display_vrm1f_35,._flip-status_vrm1f_35{font-size:12px;color:#ffffffb3;background:#ffffff14;padding:2px 6px;border-radius:10px;min-width:32px;text-align:center}._chunk-content_vrm1f_45{padding:6px 12px}._divider_vrm1f_49{height:1px;background:#ffffff14;margin:0 12px}._button-group_vrm1f_55{display:flex;flex-direction:column;gap:6px}._tip-text_vrm1f_61{font-size:11px;color:#ffffff80;margin-top:6px;text-align:center}._option-button_vrm1f_68{display:flex;align-items:center;cursor:pointer;padding:6px 10px;border-radius:8px;transition:all .2s;font-size:12px;background:#ffffff0a;border:none;color:#fff;text-align:left;width:100%}._option-button_vrm1f_68:hover{background:#ffffff14}._option-button_vrm1f_68._active_vrm1f_86{color:var(--x-player-color-primary, #007aff);background:#007aff26;font-weight:500}._option-button_vrm1f_68:disabled{opacity:.4;cursor:not-allowed;pointer-events:none}._option-button_vrm1f_68 span{margin-left:8px}._item-icon_vrm1f_103{display:flex;align-items:center;justify-content:center;width:20px;height:20px}._control-buttons_vrm1f_111{display:flex;justify-content:space-between;gap:8px}._control-button_vrm1f_111{flex:1;background:#ffffff0a;border:none;color:#fff;padding:7px 0;border-radius:8px;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center}._control-button_vrm1f_111:hover{background:#ffffff14}._control-button_vrm1f_111:disabled{opacity:.4;cursor:not-allowed;pointer-events:none}.subtitle-button[data-v-9e7cb59c]{position:relative;display:inline-block}.control-button[data-v-9e7cb59c]{background:none;border:none;color:#fff;cursor:pointer;padding:8px;transition:all .2s}.control-button[data-v-9e7cb59c]:hover{opacity:.8}.subtitle-icon[data-v-9e7cb59c]{width:24px;height:24px}.subtitle-icon.disabled[data-v-9e7cb59c]{opacity:.5;cursor:not-allowed}.loading-icon[data-v-9e7cb59c]{animation:spin-9e7cb59c 1s linear infinite}@keyframes spin-9e7cb59c{0%{transform:rotate(0)}to{transform:rotate(360deg)}}._time-display_1fmcb_2{color:#fff;font-size:13px;display:flex;align-items:center;gap:4px;-webkit-user-select:none;user-select:none;margin-left:6px}._time-separator_1fmcb_12{opacity:.7}._volume-control_10ec3_2{display:flex;align-items:center;gap:8px;margin-right:8px}._volume-control-button_10ec3_9{display:flex;align-items:center;justify-content:center;width:32px;height:32px;padding:4px;border:none;background:transparent;cursor:pointer;color:#fff}._volume-control-button_10ec3_9:hover{opacity:.8}._volume-slider_10ec3_26{width:90px;height:24px;display:flex;align-items:center}._volume-slider-container_10ec3_33{position:relative;width:100%;height:4px}._volume-slider-track_10ec3_39{position:absolute;width:100%;height:100%;background-color:#ffffff4d;border-radius:2px}._volume-slider-fill_10ec3_47{position:absolute;height:100%;background-color:var(--x-player-color-primary);border-radius:2px}._volume-slider-thumb_10ec3_54{position:absolute;width:12px;height:12px;background-color:#fff;border-radius:50%;top:50%;transform:translate(-50%,-50%);pointer-events:none;opacity:0;transition:opacity .2s}._volume-slider_10ec3_26:hover ._volume-slider-thumb_10ec3_54{opacity:1}._volume-slider-input_10ec3_71{position:absolute;top:-8px;left:0;width:100%;height:20px;opacity:0;cursor:pointer;margin:0;padding:0}._icon_10ec3_83{font-size:24px}.controls-wrapper[data-v-9d837e9b]{position:absolute;bottom:0;left:0;right:0;pointer-events:auto}.controls-gradient[data-v-9d837e9b]{position:absolute;bottom:0;left:0;right:0;height:180px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAC4CAYAAAAi0IY0AAAAAXNSR0IArs4c6QAAAQxJREFUOE9lyNdHBQAAhfHb3nvvuu2997jNe29TJJEkkkgSSSSJJJJEEkkiifRH5jsP56Xz8PM5gcC/xfCIWBNHxZsESiSaJEokQ4pJpUSaSadEhsmkskw2JXJMLiXyIN8UUKLQFFGi2JRQpaaMEuWmghKVUGWqKVFjgpSoNXVUvWmgRKNpokQztJhWSrSZdkp0mE6qy3RTosf0UqIP+s0AJQbNECWGzQg1asYoMW4mKBGCSTNFiWkzQ4lZM0eFTYQSUTNPiQVYNEuUWIYVWIU1WIcN2IQt2IYd2IU92IcDOIQjOIYTOIUzOIcLuIQruIYbuIU7uIcHeIQneIYXeIU3eIcP+IQv+IYf+P0Dkn4pkUpVXukAAAAASUVORK5CYII=);background-repeat:repeat-x;background-position:bottom;z-index:1;pointer-events:none;opacity:0;transition:opacity .3s ease}.controls-gradient.is-visible[data-v-9d837e9b]{opacity:1}.video-controls[data-v-9d837e9b]{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,#000000b3);color:#fff;z-index:2;transform:translateY(calc(100% - 30px));opacity:.5;transition:all .3s ease}.video-controls.is-visible[data-v-9d837e9b]{transform:translateY(0);opacity:1}.controls-content[data-v-9d837e9b]{padding:10px 20px}.controls-bar[data-v-9d837e9b]{display:flex;justify-content:space-between;align-items:center}.left-controls[data-v-9d837e9b],.right-controls[data-v-9d837e9b]{display:flex;align-items:center;gap:10px}button[data-v-9d837e9b]{background:none;border:none;color:#fff;cursor:pointer;padding:5px}button[data-v-9d837e9b]:hover{opacity:.8}.material-symbols-rounded[data-v-9d837e9b]{font-size:24px;color:#fff;font-variation-settings:"FILL" 1,"wght" 400,"GRAD" 0,"opsz" 24}.progress-container[data-v-9d837e9b]{position:absolute;top:0;left:20px;right:20px;z-index:3}.progress-container.hide[data-v-9d837e9b]{transform:translateY(84px)}.controls-buttons[data-v-9d837e9b]{margin-top:40px;padding-bottom:12px;transform-origin:bottom}.controls-buttons.hide[data-v-9d837e9b]{transform:translateY(84px) scaleX(0)}.controls-gradient.hide[data-v-9d837e9b]{opacity:0}._hud-popup_2mlsy_2{padding:12px;max-width:170px;min-width:120px;pointer-events:none;--x-popup-bg-color: rgba(30, 30, 30, .35) !important;--x-popup-border-radius: 12px !important;--x-popup-bg-blur: 6px !important;--x-popup-box-shadow: 0 4px 8px rgba(0, 0, 0, .15) !important}._hud-message-content_2mlsy_13{position:relative;z-index:1;display:flex;align-items:center;gap:10px;color:#ffffffe6}._message-icon_2mlsy_22{font-size:22px;display:flex;align-items:center;justify-content:center;width:24px;height:24px;flex-shrink:0;color:#fffffff2}._message-body_2mlsy_33{flex:1;display:flex;flex-direction:column;gap:3px}._message-title_2mlsy_40{font-size:13px;font-weight:600;line-height:1.2;color:#fffc}._message-value_2mlsy_47{font-size:14px;font-weight:700;line-height:1.2;color:#ffffff80}._message-progress_2mlsy_54{width:100%;height:4px;background-color:#fff3;border-radius:2px;overflow:hidden;margin-top:3px}._message-progress-bar_2mlsy_63{height:100%;background-color:#ffffff80;border-radius:2px}.loading-container[data-v-45219110]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2}.apple-loading[data-v-45219110]{position:relative;width:50px;height:20px;display:flex;align-items:center;justify-content:space-between}.apple-loading span[data-v-45219110]{width:10px;height:10px;background-color:#fffc;border-radius:50%;display:inline-block;animation:bounce-45219110 1.4s infinite ease-in-out both}.apple-loading span[data-v-45219110]:nth-child(1){animation-delay:-.32s}.apple-loading span[data-v-45219110]:nth-child(2){animation-delay:-.16s}@keyframes bounce-45219110{0%,80%,to{transform:scale(0);opacity:.3}40%{transform:scale(1);opacity:1}}.play-animation[data-v-d27e8469]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10;pointer-events:none}.play-animation-icon[data-v-d27e8469]{width:80px;height:80px;background-color:#0009;border-radius:50%;display:flex;align-items:center;justify-content:center}.icon-wrapper[data-v-d27e8469]{width:40px;height:40px;display:flex;align-items:center;justify-content:center}.fade-enter-active[data-v-d27e8469],.fade-leave-active[data-v-d27e8469]{transition:all .2s cubic-bezier(.4,0,.2,1)}.fade-enter-from[data-v-d27e8469],.fade-leave-to[data-v-d27e8469]{opacity:0;transform:translate(-50%,-50%) scale(.8)}.fade-enter-to[data-v-d27e8469],.fade-leave-from[data-v-d27e8469]{opacity:1;transform:translate(-50%,-50%) scale(1)}:root{--x-player-background-color: #000;--x-player-color-primary: #0084ff;--x-player-color-primary-hover: #339dff;--x-player-color-primary-alpha: rgba(0, 132, 255, .3);--x-player-progress-bar-track-color: rgba(255, 255, 255, .3);--x-player-progress-bar-fill-color: var(--x-player-color-primary);--x-player-progress-bar-thumb-color: #fff;--x-player-progress-bar-thumb-size: 12px;--x-player-progress-bar-height: 4px;--x-player-volume-control-track-color: rgba(255, 255, 255, .3);--x-player-volume-control-fill-color: var(--x-player-color-primary);--x-player-volume-control-thumb-color: #fff;--x-player-volume-control-thumb-size: 12px;--x-player-volume-control-height: 4px;--x-player-controller-progress-bar-color: var(--x-player-color-primary);--x-player-controller-progress-bar-color-hover: var( --x-player-color-primary-hover )}.x-player[data-v-fa402ca6]{width:100%;height:100%;position:relative;background-color:var(--x-player-background-color)}.x-player[data-v-fa402ca6] *{-webkit-user-select:none;user-select:none}.x-player.is-fullscreen[data-v-fa402ca6]{width:100vw;height:100vh}.player-container[data-v-fa402ca6]{position:relative;width:100%;height:100%;overflow:hidden}.video-container[data-v-fa402ca6]{position:relative;z-index:1;width:100%;height:100%;display:flex;justify-content:center;align-items:center}.video-mask[data-v-fa402ca6]{position:absolute;top:0;left:0;right:0;bottom:0;z-index:2}video[data-v-fa402ca6]{width:100%;height:100%;-webkit-backdrop-filter:saturate(1);backdrop-filter:saturate(1)}[data-v-fa402ca6] .controls-wrapper{z-index:3}.portal-container[data-v-fa402ca6]{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999}.portal-container[data-v-fa402ca6]>*{pointer-events:auto}.resume-container[data-v-fa402ca6]{position:absolute;top:0;left:0;width:100%;height:100%;z-index:9999;display:flex;justify-content:center;align-items:center}.resume-container button[data-v-fa402ca6]{background-color:var(--x-player-background-color);color:var(--x-player-text-color);border-radius:32px;padding:8px 16px;font-size:14px;cursor:pointer}.header-file[data-v-708d094e]{display:flex;gap:8px;font-size:20px;font-weight:700}.header-file-text[data-v-708d094e]{color:#f1f1f1}.header-file-text-size[data-v-708d094e]{color:#999;font-size:12px}footer[data-v-c19dfa52]{padding:32px 0;color:#999;gap:16px;text-align:center}.footer-tags[data-v-c19dfa52]{display:flex;align-items:center;justify-content:center;gap:16px}p[data-v-c19dfa52]{font-size:12px}p a[data-v-c19dfa52]{color:#ff0}.copy-button[data-v-a529d9a0]{display:inline-flex;align-items:center;justify-content:center;padding:2px 8px;border-radius:4px;background-color:#3b82f633;border:1px solid rgba(59,130,246,.4);color:#60a5fa;font-size:12px;cursor:pointer;transition:all .2s ease;outline:none;height:22px}.copy-button[data-v-a529d9a0]:hover{background-color:#3b82f64d}.copy-button.copied[data-v-a529d9a0]{background-color:#10b98133;border-color:#10b98166;color:#10b981}.copy-button-text[data-v-a529d9a0]{white-space:nowrap}.movie-info[data-v-3fde5513]{position:relative;display:flex;flex-direction:column}.movie-info-main[data-v-3fde5513]{position:relative;z-index:1;color:#e1e1e1;margin-top:24px}.movie-info-content[data-v-3fde5513]{display:flex;flex-direction:column;gap:12px}.movie-info-header[data-v-3fde5513]{margin-bottom:24px}.movie-info-header-title[data-v-3fde5513]{font-size:20px;font-weight:700;margin-bottom:4px;word-wrap:break-word;word-break:break-all;color:#f1f1f1;padding-right:140px}.movie-info-content-item[data-v-3fde5513]{display:flex;gap:8px;font-size:14px}.movie-info-content-item-label[data-v-3fde5513]{color:#999;min-width:40px}.movie-info-content-item-value[data-v-3fde5513]{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.movie-info-content-item-value a[data-v-3fde5513]{color:#60a5fa;text-decoration:none;transition:color .2s ease}.movie-info-content-item-value a[data-v-3fde5513]:hover{color:#3b82f6}.movie-info-header-actors[data-v-3fde5513]{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}.movie-info-header-actors-item[data-v-3fde5513]{position:relative;padding:4px;border-radius:8px;width:fit-content}.movie-info-header-actors-item-avatar[data-v-3fde5513]{position:relative;width:60px;height:60px}.movie-info-header-actors-item img[data-v-3fde5513]{display:block;width:60px;height:60px;border-radius:50%;object-fit:cover;border:2px solid #f1f1f1;box-sizing:border-box;background-color:#f1f1f1}.movie-info-header-actors-item-name[data-v-3fde5513]{font-size:16px;color:#f1f1f1;padding-right:8px}.movie-info-header-actors-item-sex[data-v-3fde5513]{position:absolute;top:-2px;right:-2px;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;background-color:#0009;color:#fff;font-size:12px}.movie-info-header-actors-item-sex.female[data-v-3fde5513]{background-color:#f472b6cc}.movie-info-header-actors-item-sex.male[data-v-3fde5513]{background-color:#3b82f6cc}.movie-info-header-actors-item-content[data-v-3fde5513]{display:flex;align-items:center;gap:12px;text-decoration:none;width:100%}.movie-info-source-switch[data-v-3fde5513]{position:absolute;top:0;right:0;display:flex;gap:8px;z-index:2}.movie-info-source-switch-item[data-v-3fde5513]{padding:6px 12px;border-radius:4px;background:#00000080;cursor:pointer;transition:all .2s ease}.movie-info-source-switch-item[data-v-3fde5513]:hover{background:#000000b3}.movie-info-source-switch-item.active[data-v-3fde5513]{background:#60a5fa}.movie-info-source-switch-item-text[data-v-3fde5513]{font-size:12px;color:#fff}.movie-info-thumb[data-v-3fde5513]{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}.movie-info-thumb-item[data-v-3fde5513]{width:calc(12.5% - 12px);aspect-ratio:1 / 1;border-radius:5px;overflow:hidden;cursor:pointer;transition:opacity .2s;display:block;text-decoration:none}.movie-info-thumb-item[data-v-3fde5513]:hover{opacity:.8}.movie-info-thumb-item img[data-v-3fde5513]{width:100%;height:100%;object-fit:cover}.playlist[data-v-1718588c]{position:relative;display:flex;flex-direction:column;width:100%;height:100%;background-color:#000000e6;color:#fff;box-sizing:border-box;border-radius:16px;z-index:1;overflow:hidden}.playlist-header[data-v-1718588c]{position:absolute;top:0;left:0;right:0;z-index:2;font-size:20px;color:#eee;padding:20px 28px}.playlist-list[data-v-1718588c]{display:flex;flex-direction:column;gap:8px;padding:12px 16px 20px;margin-top:68px;overflow-y:auto}.playlist-item[data-v-1718588c]{padding:12px;border-radius:8px;transition:background-color .2s ease;cursor:pointer;gap:2px;color:#eee;word-wrap:break-word}.playlist-item[data-v-1718588c]:hover{background-color:#ffffff1a}.playlist-item.active[data-v-1718588c]{background-color:#fff3}.playlist-item-title[data-v-1718588c]{font-size:14px}.playlist-item-size[data-v-1718588c]{font-size:12px;color:#999}.playlist[data-v-1718588c]::-webkit-scrollbar{width:6px}.playlist[data-v-1718588c]::-webkit-scrollbar-track{background:transparent}.playlist[data-v-1718588c]::-webkit-scrollbar-thumb{background-color:#fff3;border-radius:3px}.playlist[data-v-1718588c]::-webkit-scrollbar-thumb:hover{background-color:#ffffff4d}::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#ffffff4d;border-radius:4px}::-webkit-scrollbar-thumb:hover{background:#ffffff4d}:fullscreen ::-webkit-scrollbar{width:0!important;height:0!important;display:none!important}.page-container[data-v-62c2e553]{padding:36px 0 56px;background:#0f0f0f;display:flex;flex-direction:column;min-height:100vh;color:#fff;align-items:center;--video-player-height: calc(100vh - 112px) ;--page-main-width-a: calc(16 / 9 * (100vh - 36px - 24px * 2 - 28px));--page-main-width-b: calc(100vw - 440px) ;--page-main-width: min(var(--page-main-width-a), var(--page-main-width-b));--video-player-width: var(--page-main-width)}.page-local-play[data-v-62c2e553]{display:inline-flex;background:#000;color:#fff;padding:10px 20px;border-radius:16px;cursor:pointer}.page-body[data-v-62c2e553]{display:flex;gap:24px}.page-main[data-v-62c2e553]{display:flex;flex-direction:column;width:var(--page-main-width);gap:24px}.page-flow[data-v-62c2e553]{display:flex;flex-direction:column;gap:24px;min-height:720px}.video-player[data-v-62c2e553]{aspect-ratio:16 / 9;width:var(--video-player-width);height:auto;border-radius:16px;overflow:hidden}.page-sider-playlist[data-v-62c2e553]{width:380px;height:calc(100vh - 60px);flex:1}.is-theatre.page-container[data-v-62c2e553]{padding:0}.is-theatre .page-main[data-v-62c2e553],.is-theatre .page-body[data-v-62c2e553]{width:100%}.is-theatre .page-header[data-v-62c2e553]{display:none}.is-theatre .page-flow[data-v-62c2e553]{padding:0 490px 56px 86px;box-sizing:border-box}.is-theatre .page-sider[data-v-62c2e553]{position:absolute;top:calc(100vh + 76px);right:86px}.is-theatre .page-sider-playlist[data-v-62c2e553]{height:720px}.is-theatre .video-player[data-v-62c2e553]{width:100%;height:100vh;max-height:none;border-radius:0}:fullscreen .page-container[data-v-62c2e553]{padding:0 0 56px}:fullscreen .page-main[data-v-62c2e553]{width:auto}:fullscreen .page-header[data-v-62c2e553]{display:none}:fullscreen .page-flow[data-v-62c2e553]{padding:0 490px 56px 86px;box-sizing:border-box}:fullscreen .page-sider[data-v-62c2e553]{position:absolute;top:calc(100vh + 76px);right:86px}:fullscreen .page-sider-playlist[data-v-62c2e553]{height:720px}:fullscreen .video-player[data-v-62c2e553]{width:100vw;height:100vh;max-height:none;border-radius:0} `);

System.addImportMap({ imports: {"vue":"user:vue","lodash":"user:lodash","photoswipe/lightbox":"user:photoswipe/lightbox","photoswipe":"user:photoswipe","localforage":"user:localforage","dayjs":"user:dayjs","m3u8-parser":"user:m3u8-parser","blueimp-md5":"user:blueimp-md5","mux.js":"user:mux.js","big-integer":"user:big-integer","hls.js":"user:hls.js"} });
System.set("user:vue", (()=>{const _=Vue;('default' in _)||(_.default=_);return _})());
System.set("user:lodash", (()=>{const _1=_;('default' in _1)||(_1.default=_1);return _1})());
System.set("user:photoswipe/lightbox", (()=>{const _=PhotoSwipeLightbox;('default' in _)||(_.default=_);return _})());
System.set("user:photoswipe", (()=>{const _=photoswipe;('default' in _)||(_.default=_);return _})());
System.set("user:localforage", (()=>{const _=localforage;('default' in _)||(_.default=_);return _})());
System.set("user:dayjs", (()=>{const _=dayjs;('default' in _)||(_.default=_);return _})());
System.set("user:m3u8-parser", (()=>{const _=m3u8Parser;('default' in _)||(_.default=_);return _})());
System.set("user:blueimp-md5", (()=>{const _=md5;('default' in _)||(_.default=_);return _})());
System.set("user:mux.js", (()=>{const _=muxjs;('default' in _)||(_.default=_);return _})());
System.set("user:big-integer", (()=>{const _=bigInt;('default' in _)||(_.default=_);return _})());
System.set("user:hls.js", (()=>{const _=Hls;('default' in _)||(_.default=_);return _})());

System.register("./__entry.js", ['./__monkey.entry-D9DeQVnG.js'], (function (exports, module) {
	'use strict';
	return {
		setters: [null],
		execute: (function () {



		})
	};
}));

System.register("./__monkey.entry-D9DeQVnG.js", ['vue', 'localforage', 'lodash', 'dayjs', 'photoswipe/lightbox', 'm3u8-parser', 'mux.js', 'blueimp-md5', 'big-integer'], (function (exports, module) {
  'use strict';
  var createApp, h, defineAsyncComponent, defineComponent, ref, openBlock, createBlock, Teleport, createElementBlock, createElementVNode, withModifiers, toDisplayString, createCommentVNode, watch, getCurrentScope, onScopeDispose, toRef$1, readonly, customRef, onUnmounted, computed, toValue, shallowRef, isRef, getCurrentInstance, onMounted, nextTick, unref, createVNode, Fragment, renderList, onBeforeUnmount, renderSlot, createTextVNode, normalizeClass, normalizeStyle, createStaticVNode, mergeProps, localforage, merge, sampleSize, dayjs, PhotoSwipeLightbox, Parser, Mux, md5, bigInt;
  return {
    setters: [module => {
      createApp = module.createApp;
      h = module.h;
      defineAsyncComponent = module.defineAsyncComponent;
      defineComponent = module.defineComponent;
      ref = module.ref;
      openBlock = module.openBlock;
      createBlock = module.createBlock;
      Teleport = module.Teleport;
      createElementBlock = module.createElementBlock;
      createElementVNode = module.createElementVNode;
      withModifiers = module.withModifiers;
      toDisplayString = module.toDisplayString;
      createCommentVNode = module.createCommentVNode;
      watch = module.watch;
      getCurrentScope = module.getCurrentScope;
      onScopeDispose = module.onScopeDispose;
      toRef$1 = module.toRef;
      readonly = module.readonly;
      customRef = module.customRef;
      onUnmounted = module.onUnmounted;
      computed = module.computed;
      toValue = module.toValue;
      shallowRef = module.shallowRef;
      isRef = module.isRef;
      getCurrentInstance = module.getCurrentInstance;
      onMounted = module.onMounted;
      nextTick = module.nextTick;
      unref = module.unref;
      createVNode = module.createVNode;
      Fragment = module.Fragment;
      renderList = module.renderList;
      onBeforeUnmount = module.onBeforeUnmount;
      renderSlot = module.renderSlot;
      createTextVNode = module.createTextVNode;
      normalizeClass = module.normalizeClass;
      normalizeStyle = module.normalizeStyle;
      createStaticVNode = module.createStaticVNode;
      mergeProps = module.mergeProps;
    }, module => {
      localforage = module.default;
    }, module => {
      merge = module.merge;
      sampleSize = module.sampleSize;
    }, module => {
      dayjs = module.default;
    }, module => {
      PhotoSwipeLightbox = module.default;
    }, module => {
      Parser = module.Parser;
    }, module => {
      Mux = module.default;
    }, module => {
      md5 = module.default;
    }, module => {
      bigInt = module.default;
    }],
    execute: (function () {

      exports({
        a: useAsyncState,
        b: useThrottleFn,
        d: useStorage,
        h: getAvNumber,
        p: useEventListener,
        r: useVModel,
        t: tryOnUnmounted,
        u: useTitle,
        v: onClickOutside,
        x: useElementSize
      });

      function getDefaultExportFromCjs(x) {
        return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
      }
      var globToRegexp;
      var hasRequiredGlobToRegexp;
      function requireGlobToRegexp() {
        if (hasRequiredGlobToRegexp) return globToRegexp;
        hasRequiredGlobToRegexp = 1;
        globToRegexp = function(glob, opts) {
          if (typeof glob !== "string") {
            throw new TypeError("Expected a string");
          }
          var str = String(glob);
          var reStr = "";
          var extended = opts ? !!opts.extended : false;
          var globstar = opts ? !!opts.globstar : false;
          var inGroup = false;
          var flags = opts && typeof opts.flags === "string" ? opts.flags : "";
          var c;
          for (var i2 = 0, len = str.length; i2 < len; i2++) {
            c = str[i2];
            switch (c) {
              case "/":
              case "$":
              case "^":
              case "+":
              case ".":
              case "(":
              case ")":
              case "=":
              case "!":
              case "|":
                reStr += "\\" + c;
                break;
              case "?":
                if (extended) {
                  reStr += ".";
                  break;
                }
              case "[":
              case "]":
                if (extended) {
                  reStr += c;
                  break;
                }
              case "{":
                if (extended) {
                  inGroup = true;
                  reStr += "(";
                  break;
                }
              case "}":
                if (extended) {
                  inGroup = false;
                  reStr += ")";
                  break;
                }
              case ",":
                if (inGroup) {
                  reStr += "|";
                  break;
                }
                reStr += "\\" + c;
                break;
              case "*":
                var prevChar = str[i2 - 1];
                var starCount = 1;
                while (str[i2 + 1] === "*") {
                  starCount++;
                  i2++;
                }
                var nextChar = str[i2 + 1];
                if (!globstar) {
                  reStr += ".*";
                } else {
                  var isGlobstar = starCount > 1 && (prevChar === "/" || prevChar === undefined) && (nextChar === "/" || nextChar === undefined);
                  if (isGlobstar) {
                    reStr += "((?:[^/]*(?:/|$))*)";
                    i2++;
                  } else {
                    reStr += "([^/]*)";
                  }
                }
                break;
              default:
                reStr += c;
            }
          }
          if (!flags || !~flags.indexOf("g")) {
            reStr = "^" + reStr + "$";
          }
          return new RegExp(reStr, flags);
        };
        return globToRegexp;
      }
      var globToRegexpExports = requireGlobToRegexp();
      const globToRegex = /* @__PURE__ */ getDefaultExportFromCjs(globToRegexpExports);
      const NORMAL_HOST_155 = "115.com";
      const WEB_API_HOST_155 = "webapi.115.com";
      const PRO_API_HOST_155 = "proapi.115.com";
      const VOD_HOST_155 = "115vod.com";
      const DL_HOST_155 = "dl.115cdn.net";
      const NORMAL_URL_115 = `https://${NORMAL_HOST_155}`;
      const WEB_API_URL_115 = `https://${WEB_API_HOST_155}`;
      const PRO_API_URL_115 = `https://${PRO_API_HOST_155}`;
      const VOD_URL_115 = `https://${VOD_HOST_155}`;
      const DL_URL_115 = `https://${DL_HOST_155}`;
      const ROUTE_MATCH = {
        HOME: `*://${NORMAL_HOST_155}/?*`,
        VIDEO: `*://${NORMAL_HOST_155}/web/lixian/master/video/*`,
        VIDEO_TOKEN: `*://${DL_HOST_155}/video/token`
      };
      class Logger {
        constructor(appName, moduleName) {
          this.appName = appName;
          this.moduleName = moduleName;
        }
        formatMessage(logName, ...args) {
          return [
            `%c${this.appName}%c ${this.moduleName}%c ${logName}%c ${args}`,
            "color: #409EFF; font-weight: bold",
            // appName 样式：蓝色
            "color: #67C23A; font-weight: bold",
            // moduleName 样式：绿色
            "color: #E6A23C; font-weight: bold",
            // logName 样式：黄色
            "color: inherit; margin-top: 4px"
            // 恢复默认样式
          ];
        }
        log(logName, ...args) {
          if (args.length === 0 || typeof args[0] === "string" || typeof args[0] === "number") {
            console.log(...this.formatMessage(logName, ...args));
          } else {
            console.log(...this.formatMessage(logName));
            console.log(...args);
          }
        }
        error(logName, msg) {
          console.log(...this.formatMessage(logName));
          console.error(msg);
        }
      }
      class AppLogger extends Logger {
        constructor(moduleName) {
          super("115Master", moduleName);
        }
      } exports("A", AppLogger);
      var _GM_cookie = /* @__PURE__ */ (() => typeof GM_cookie != "undefined" ? GM_cookie : undefined)();
      var _GM_info = exports("k", /* @__PURE__ */ (() => typeof GM_info != "undefined" ? GM_info : undefined)());
      var _GM_notification = /* @__PURE__ */ (() => typeof GM_notification != "undefined" ? GM_notification : undefined)();
      var _GM_openInTab = /* @__PURE__ */ (() => typeof GM_openInTab != "undefined" ? GM_openInTab : undefined)();
      var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : undefined)();
      var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : undefined)();
      const STORE_NAME = `115master_cache${""}`;
      const STORAGE_QUOTA_THRESHOLD = 0.8;
      const CLEANUP_BATCH_SIZE = 10;
      const META_STORE_NAME = "meta";
      class MetaStore {
        constructor(name = STORE_NAME, storeName = "cache") {
          this.name = name;
          this.storeName = storeName;
          this.storage = localforage.createInstance({
            name: STORE_NAME,
            storeName: META_STORE_NAME,
            version: 1,
            description: "缓存元数据",
            driver: localforage.INDEXEDDB
          });
        }
        /**
         * 生成完整的元数据键
         * @param key 原始缓存键
         * @returns 完整的元数据键
         */
        generateFullKey(key) {
          return `${this.storeName}:${key}`;
        }
        /**
         * 更新缓存项的元数据
         * @param key 缓存键
         * @param size 缓存项大小（可选）
         * @param createdAt 创建时间（可选，如果不提供则使用现有值或当前时间）
         * @param updatedAt 更新时间（可选，如果不提供则使用当前时间）
         */
        async updateMeta(key, size, createdAt, updatedAt) {
          try {
            const fullKey = this.generateFullKey(key);
            const now = Date.now();
            const existingMeta = await this.getMeta(key);
            const meta = {
              key,
              fullKey,
              storeName: this.storeName,
              lastAccessed: now,
              // 如果提供了创建时间，使用提供的值；否则使用现有值或当前时间
              createdAt: createdAt ?? (existingMeta == null ? void 0 : existingMeta.createdAt) ?? now,
              // 如果提供了更新时间，使用提供的值；否则使用当前时间
              updatedAt: updatedAt ?? now
            };
            if (size !== void 0) {
              meta.size = size;
            } else if ((existingMeta == null ? void 0 : existingMeta.size) !== void 0) {
              meta.size = existingMeta.size;
            }
            await this.storage.setItem(fullKey, meta);
          } catch (error) {
            console.error("更新缓存元数据失败:", error);
          }
        }
        /**
         * 获取缓存项的元数据
         * @param key 缓存键
         */
        async getMeta(key) {
          const fullKey = this.generateFullKey(key);
          return await this.storage.getItem(fullKey);
        }
        /**
         * 删除缓存项的元数据
         * @param key 缓存键
         */
        async removeMeta(key) {
          const fullKey = this.generateFullKey(key);
          await this.storage.removeItem(fullKey);
        }
        /**
         * 获取所有缓存项的元数据
         * @returns 所有缓存项的元数据数组
         */
        async getAllMeta() {
          const items = [];
          await this.storage.iterate((value) => {
            if (value.storeName === this.storeName) {
              items.push(value);
            }
          });
          return items;
        }
        /**
         * 获取按最后访问时间排序的缓存项元数据
         * @param ascending 是否按升序排序（默认为true，即最旧的在前）
         * @returns 排序后的缓存项元数据数组
         */
        async getSortedByLastAccessed(ascending = true) {
          const items = await this.getAllMeta();
          return items.sort((a, b) => {
            return ascending ? a.lastAccessed - b.lastAccessed : b.lastAccessed - a.lastAccessed;
          });
        }
        /**
         * 清除所有元数据
         * 注意：只清除当前 name 和 storeName 的元数据
         */
        async clear() {
          const allItems = await this.getAllMeta();
          for (const item of allItems) {
            await this.storage.removeItem(item.fullKey);
          }
        }
        /**
         * 获取缓存项的创建时间
         * @param key 缓存键
         * @returns 创建时间戳，如果元数据不存在则返回 undefined
         */
        async getCreatedAt(key) {
          const meta = await this.getMeta(key);
          return meta == null ? undefined : meta.createdAt;
        }
        /**
         * 获取缓存项的更新时间
         * @param key 缓存键
         * @returns 更新时间戳，如果元数据不存在则返回 undefined
         */
        async getUpdatedAt(key) {
          const meta = await this.getMeta(key);
          return meta == null ? undefined : meta.updatedAt;
        }
        /**
         * 获取按创建时间排序的缓存项元数据
         * @param ascending 是否按升序排序（默认为true，即最早创建的在前）
         * @returns 排序后的缓存项元数据数组
         */
        async getSortedByCreatedAt(ascending = true) {
          const items = await this.getAllMeta();
          return items.sort((a, b) => {
            return ascending ? a.createdAt - b.createdAt : b.createdAt - a.createdAt;
          });
        }
        /**
         * 获取按更新时间排序的缓存项元数据
         * @param ascending 是否按升序排序（默认为true，即最早更新的在前）
         * @returns 排序后的缓存项元数据数组
         */
        async getSortedByUpdatedAt(ascending = true) {
          const items = await this.getAllMeta();
          return items.sort((a, b) => {
            return ascending ? a.updatedAt - b.updatedAt : b.updatedAt - a.updatedAt;
          });
        }
      }
      class QuotaManager {
        constructor(cacheInstance, name, storeName) {
          this.cacheInstance = cacheInstance;
          this.metaStore = new MetaStore(name, storeName);
        }
        /**
         * 获取当前存储空间使用情况
         * @returns 存储空间使用情况
         */
        async getStorageUsage() {
          var _a;
          if ((_a = navigator.storage) == null ? undefined : _a.estimate) {
            const estimate = await navigator.storage.estimate();
            const usage = estimate.usage || 0;
            const quota = estimate.quota || 0;
            const usageRatio = quota > 0 ? usage / quota : 0;
            return {
              usage,
              quota,
              usageRatio
            };
          }
          return {
            usage: 0,
            quota: 0,
            usageRatio: 0
          };
        }
        /**
         * 检查是否需要清理存储空间
         * @returns 是否需要清理
         */
        async shouldCleanup() {
          const { usageRatio } = await this.getStorageUsage();
          return usageRatio > STORAGE_QUOTA_THRESHOLD;
        }
        /**
         * 清理旧数据
         * @param batchSize 每批清理的数量，默认使用常量定义的值
         * @returns 已清理的键数组
         */
        async cleanup(batchSize = CLEANUP_BATCH_SIZE) {
          const needCleanup = await this.shouldCleanup();
          if (!needCleanup) {
            return [];
          }
          const oldestItems = await this.metaStore.getSortedByLastAccessed(true);
          if (oldestItems.length === 0) {
            return [];
          }
          const itemsToCleanup = oldestItems.slice(0, batchSize);
          const cleanedKeys = [];
          for (const item of itemsToCleanup) {
            try {
              await this.cacheInstance.remove(item.key);
              await this.metaStore.removeMeta(item.key);
              cleanedKeys.push(item.key);
            } catch (error) {
              console.error(`清理缓存项 ${item.key} 失败:`, error);
            }
          }
          console.log(`已清理 ${cleanedKeys.length} 个旧缓存项`);
          return cleanedKeys;
        }
        /**
         * 记录缓存项访问
         * @param key 缓存键
         * @param size 缓存项大小（可选）
         * @param createdAt 创建时间（可选）
         * @param updatedAt 更新时间（可选）
         */
        async recordAccess(key, size, createdAt, updatedAt) {
          await this.metaStore.updateMeta(key, size, createdAt, updatedAt);
        }
        /**
         * 记录缓存项删除
         * @param key 缓存键
         */
        async recordRemoval(key) {
          await this.metaStore.removeMeta(key);
        }
        /**
         * 清空所有元数据
         */
        async clearAllMeta() {
          await this.metaStore.clear();
        }
        /**
         * 自动清理
         * 检查存储空间使用情况，如果超过阈值则进行清理
         * @returns 是否进行了清理
         */
        async autoCleanup() {
          const needCleanup = await this.shouldCleanup();
          if (needCleanup) {
            const cleanedKeys = await this.cleanup();
            return cleanedKeys.length > 0;
          }
          return false;
        }
      }
      class CacheCore {
        constructor(options = {}) {
          const { enableQuotaManagement = true, ...storageOptions } = options;
          this.name = storageOptions.name || STORE_NAME;
          this.storeName = storageOptions.storeName || "cache";
          this.storage = localforage.createInstance({
            name: this.name,
            storeName: this.storeName,
            version: 1,
            description: "cache",
            driver: localforage.INDEXEDDB,
            ...storageOptions
          });
          this.enableQuotaManagement = enableQuotaManagement;
          this.quotaManager = new QuotaManager(this, this.name, this.storeName);
        }
        /**
         * 估算数据大小
         * @param value 需要估算大小的数据
         * @param key 缓存键（用于日志记录）
         * @returns 估算的数据大小（字节）或 undefined（如果无法估算）
         */
        estimateSize(value, key) {
          try {
            if (value instanceof Blob) {
              return value.size;
            }
            if (Array.isArray(value) && value.length > 0 && value[0] instanceof Blob) {
              return value.reduce((total, item) => {
                if (item instanceof Blob) {
                  return total + item.size;
                }
                return total;
              }, 0);
            }
            const valueStr = JSON.stringify(value);
            return new Blob([valueStr]).size;
          } catch (e) {
            console.warn(`无法估算缓存项 ${key} 的大小:`, e);
            return undefined;
          }
        }
        /**
         * 获取缓存项
         * @param key 缓存键
         * @returns 缓存值
         */
        async get(key) {
          const cache = await this.storage.getItem(key);
          if (cache && this.enableQuotaManagement) {
            await this.quotaManager.recordAccess(key, cache.size);
          }
          return cache;
        }
        /**
         * 设置缓存项
         * @param key 缓存键
         * @param value 缓存值
         * @returns Promise<void>
         */
        async set(key, value) {
          try {
            let size;
            if (this.enableQuotaManagement) {
              size = this.estimateSize(value, key);
            }
            const now = Date.now();
            const existingCache = await this.storage.getItem(key);
            const cacheValue = {
              value,
              ...size !== void 0 ? { size } : {},
              createdAt: (existingCache == null ? void 0 : existingCache.createdAt) || now,
              // 如果是新项目则设置创建时间，否则保留原创建时间
              updatedAt: now
              // 更新时间总是当前时间
            };
            await this.storage.setItem(key, cacheValue);
            if (this.enableQuotaManagement) {
              await this.quotaManager.recordAccess(
                key,
                size,
                cacheValue.createdAt,
                cacheValue.updatedAt
              );
              await this.quotaManager.autoCleanup();
            }
          } catch (error) {
            if (error instanceof DOMException && error.name === "QuotaExceededError") {
              console.error("缓存失败: 超出配额");
              if (this.enableQuotaManagement) {
                const cleaned = await this.quotaManager.cleanup();
                if (cleaned.length > 0) {
                  await this.set(key, value);
                  return;
                }
              }
            } else {
              console.error("缓存失败:", error);
            }
          }
        }
        /**
         * 删除缓存项
         * @param key 缓存键
         */
        async remove(key) {
          await this.storage.removeItem(key);
          if (this.enableQuotaManagement) {
            await this.quotaManager.recordRemoval(key);
          }
        }
        /**
         * 清空缓存
         */
        async clear() {
          await this.storage.clear();
          if (this.enableQuotaManagement) {
            await this.quotaManager.clearAllMeta();
          }
        }
        /**
         * 获取空间限额管理器
         * @returns 空间限额管理器实例
         */
        getQuotaManager() {
          return this.quotaManager;
        }
        /**
         * 获取缓存项的创建时间
         * @param key 缓存键
         * @returns 创建时间戳，如果缓存项不存在则返回 undefined
         */
        async getCreatedAt(key) {
          const cache = await this.storage.getItem(key);
          return cache == null ? undefined : cache.createdAt;
        }
        /**
         * 获取缓存项的更新时间
         * @param key 缓存键
         * @returns 更新时间戳，如果缓存项不存在则返回 undefined
         */
        async getUpdatedAt(key) {
          const cache = await this.storage.getItem(key);
          return cache == null ? undefined : cache.updatedAt;
        }
        /**
         * 获取缓存项的年龄（从创建到现在的时间）
         * @param key 缓存键
         * @returns 缓存项年龄（毫秒），如果缓存项不存在则返回 undefined
         */
        async getAge(key) {
          const createdAt = await this.getCreatedAt(key);
          if (createdAt === undefined) return undefined;
          return Date.now() - createdAt;
        }
        /**
         * 获取缓存项的新鲜度（从上次更新到现在的时间）
         * @param key 缓存键
         * @returns 缓存项新鲜度（毫秒），如果缓存项不存在则返回 undefined
         */
        async getFreshness(key) {
          const updatedAt = await this.getUpdatedAt(key);
          if (updatedAt === undefined) return undefined;
          return Date.now() - updatedAt;
        }
      }
      const ACTRESS_FACE_CACHE_KEY = "actress_face_json_cache";
      class ActressFaceCache extends CacheCore {
        constructor() {
          super({
            storeName: ACTRESS_FACE_CACHE_KEY
          });
        }
        /**
         * 获取演员头像数据
         */
        async getActressData() {
          const cache = await this.get("actress_data");
          return cache ? cache.value : null;
        }
        /**
         * 保存演员头像数据
         */
        async saveActressData(imageMap, timestamp) {
          await this.set("actress_data", {
            imageMap,
            timestamp
          });
        }
        /**
         * 获取上次更新时间
         */
        async getLastUpdateTime() {
          const data = await this.getActressData();
          return data ? data.timestamp : -1;
        }
      }
      const actressFaceCache = new ActressFaceCache();
      const _ActressFaceDB = class _ActressFaceDB {
        constructor() {
          this.lastUpdateTime = -1;
          this.initPromise = null;
          this.imageMap = /* @__PURE__ */ new Map();
          this.updateTimer = null;
          this.init();
        }
        /**
         * 初始化数据库
         */
        async init() {
          const promise = new Promise(async (resolve) => {
            this.lastUpdateTime = await actressFaceCache.getLastUpdateTime();
            await this.loadFromCache();
            if (await this.checkUpdate()) {
              await this.updateDB();
            }
            resolve(this);
          });
          this.initPromise = promise;
          await promise;
          return this;
        }
        /**
         * 从远程更新数据库
         */
        async updateDB() {
          try {
            _GM_notification("️正在更新头像数据库...");
            const response = await fetch(_ActressFaceDB.API_URL);
            if (!response.ok) {
              throw new Error(response.status);
            }
            const data = await response.json();
            await this.processAndSaveData(data);
            _GM_notification("✅ 头像数据库更新完成");
          } catch (error) {
            _GM_notification(`❌ 更新头像数据库失败 ${error.message}`);
            console.error("更新头像数据库失败:", error);
            throw error;
          }
        }
        /**
         * 检查是否需要更新
         */
        async checkUpdate() {
          const now = Date.now();
          return now - this.lastUpdateTime >= _ActressFaceDB.CACHE_DURATION;
        }
        /**
         * 查找演员头像信息
         */
        async findActress(name) {
          await this.initPromise;
          const actress = this.imageMap.get(name);
          if (!actress) {
            return undefined;
          }
          const file = actress[0];
          return {
            ...file,
            url: `https://raw.githubusercontent.com/gfriends/gfriends/refs/heads/master/Content/${file.folder}/${file.filename}`
          };
        }
        /**
         * 获取所有演员数据
         */
        getAllActresses() {
          return this.imageMap;
        }
        /**
         * 销毁实例
         */
        destroy() {
          if (this.updateTimer) {
            window.clearInterval(this.updateTimer);
            this.updateTimer = null;
          }
        }
        /**
         * 从缓存加载数据
         */
        async loadFromCache() {
          try {
            const cachedData = await actressFaceCache.getActressData();
            if (cachedData) {
              const now = Date.now();
              if (now - cachedData.timestamp < _ActressFaceDB.CACHE_DURATION) {
                this.imageMap = new Map(cachedData.imageMap);
                this.lastUpdateTime = cachedData.timestamp;
                return true;
              }
            }
            return false;
          } catch (error) {
            console.error("从缓存加载数据失败:", error);
            return false;
          }
        }
        /**
         * 处理并保存数据
         */
        async processAndSaveData(data) {
          const newMap = /* @__PURE__ */ new Map();
          Object.entries(data.Content).forEach(([folder, files]) => {
            Object.entries(files).forEach(([originalName, filePath]) => {
              const [, timestampStr] = filePath.split("?t=");
              const timestamp = parseInt(timestampStr, 10);
              const actressName = originalName.replace(".jpg", "");
              const file = {
                folder,
                filename: filePath,
                timestamp
              };
              const files2 = newMap.get(actressName);
              if (files2 && (files2 == null ? undefined : files2.length) > 0) {
                files2.push(file);
                newMap.set(actressName, files2);
              } else {
                newMap.set(actressName, [file]);
              }
            });
          });
          this.imageMap = newMap;
          this.lastUpdateTime = Date.now();
          await Promise.all([
            actressFaceCache.saveActressData(
              Array.from(newMap.entries()),
              this.lastUpdateTime
            )
          ]);
        }
      };
      _ActressFaceDB.CACHE_DURATION = 24 * 60 * 60 * 1e3;
      _ActressFaceDB.API_URL = "https://raw.githubusercontent.com/gfriends/gfriends/refs/heads/master/Filetree.json";
      let ActressFaceDB = _ActressFaceDB;
      const actressFaceDB = new ActressFaceDB();
      const PREVIEW_CACHE_KEY$2 = "preview_cache";
      class PreviewCache extends CacheCore {
        constructor() {
          super({
            storeName: PREVIEW_CACHE_KEY$2
          });
        }
      }
      const previewCache = new PreviewCache();
      class GMRequestCache {
        /**
         * 构造函数
         * @param storeName 存储名称，默认为 "gm-request-cache"
         * @param defaultCacheTime 默认缓存时间（毫秒），默认为 1 小时
         */
        constructor(storeName = "gm-request-cache", defaultCacheTime = 36e5) {
          this.cache = new CacheCore({
            name: STORE_NAME,
            storeName,
            enableQuotaManagement: true
          });
          this.defaultCacheTime = defaultCacheTime;
        }
        /**
         * 生成缓存键
         * @param url 请求 URL
         * @param options 请求选项
         * @returns 缓存键
         */
        generateCacheKey(url, options = {}) {
          const method = options.method || "GET";
          let key = `${method}:${url}`;
          if (options.params) {
            const paramsStr = JSON.stringify(options.params);
            key += `:params:${paramsStr}`;
          }
          if (options.body) {
            try {
              const bodyStr = typeof options.body === "string" ? options.body : JSON.stringify(options.body);
              key += `:body:${bodyStr}`;
            } catch (e) {
              key += `:body:${typeof options.body}`;
            }
          }
          return key;
        }
        /**
         * 将 Response 对象转换为可序列化的格式
         * @param response Response 对象
         * @returns 序列化后的响应数据和原始响应的 Promise
         */
        async serializeResponse(response) {
          const clonedResponse = response.clone();
          const headers = {};
          clonedResponse.headers.forEach((value, key) => {
            headers[key] = value;
          });
          let body = null;
          if (clonedResponse.bodyUsed) {
            body = null;
          } else {
            try {
              const contentType = clonedResponse.headers.get("content-type") || "";
              if (contentType.includes("application/json")) {
                body = await clonedResponse.text();
              } else if (contentType.includes("text/") || contentType.includes("application/javascript") || contentType.includes("application/xml")) {
                body = await clonedResponse.text();
              } else {
                body = await clonedResponse.arrayBuffer();
              }
            } catch (error) {
              console.error("序列化响应体失败:", error);
              body = null;
            }
          }
          const serialized = {
            body,
            status: clonedResponse.status,
            statusText: clonedResponse.statusText,
            headers,
            url: clonedResponse.url,
            type: clonedResponse.type,
            redirected: clonedResponse.redirected,
            bodyUsed: clonedResponse.bodyUsed
          };
          return { serialized, original: response };
        }
        /**
         * 将序列化的响应数据转换回 Response 对象
         * @param serialized 序列化的响应数据
         * @returns Response 对象
         */
        deserializeResponse(serialized) {
          const headers = new Headers();
          Object.entries(serialized.headers).forEach(([key, value]) => {
            headers.append(key, value);
          });
          const body = serialized.body;
          return new Response(body, {
            status: serialized.status,
            statusText: serialized.statusText,
            headers
          });
        }
        /**
         * 获取缓存的响应
         * @param url 请求 URL
         * @param options 请求选项
         * @returns 缓存的响应，如果没有缓存或缓存已过期则返回 null
         */
        async get(url, options = {}) {
          const key = this.generateCacheKey(url, options);
          const cacheItem = await this.cache.get(key);
          if (!cacheItem) {
            return null;
          }
          const { serializedResponse, timestamp } = cacheItem.value;
          const cacheTime = options.cacheTime || this.defaultCacheTime;
          if (Date.now() - timestamp > cacheTime) {
            await this.cache.remove(key);
            return null;
          }
          return this.deserializeResponse(serializedResponse);
        }
        /**
         * 缓存响应
         * @param url 请求 URL
         * @param response 响应对象
         * @param options 请求选项
         */
        async set(url, response, options = {}) {
          const cacheStatus = options.cacheStatus || [200];
          if (!cacheStatus.includes(response.status)) {
            return;
          }
          try {
            const key = this.generateCacheKey(url, options);
            const { serialized } = await this.serializeResponse(response);
            await this.cache.set(key, {
              serializedResponse: serialized,
              timestamp: Date.now(),
              url
            });
          } catch (error) {
            console.error("缓存响应失败:", error);
          }
        }
        /**
         * 清除指定 URL 的缓存
         * @param url 请求 URL
         * @param options 请求选项
         */
        async remove(url, options = {}) {
          const key = this.generateCacheKey(url, options);
          await this.cache.remove(key);
        }
        /**
         * 清除所有缓存
         */
        async clear() {
          await this.cache.clear();
        }
        /**
         * 获取缓存管理器
         * @returns 缓存核心实例
         */
        getCacheCore() {
          return this.cache;
        }
      }
      const PREVIEW_CACHE_KEY$1 = "image_cache";
      class ImageCache extends CacheCore {
        constructor() {
          super({
            storeName: PREVIEW_CACHE_KEY$1
          });
        }
      }
      const imageCache = new ImageCache();
      class SubtitleCache extends CacheCore {
        // 7天过期
        constructor() {
          super({
            storeName: "subtitle_cache"
          });
          this.logger = new AppLogger("Utils SubtitleCache");
          this.CACHE_PREFIX = "115master_subtitle_";
          this.DEFAULT_EXPIRES_IN = 7 * 24 * 60 * 60 * 1e3;
        }
        // 生成缓存键
        getCacheKey(keyword, language) {
          return `${this.CACHE_PREFIX}${keyword}_${language}`;
        }
        // 获取缓存
        async getCache(keyword, language) {
          try {
            const cacheKey = this.getCacheKey(keyword, language);
            const cacheItem = await super.get(cacheKey);
            if (!cacheItem) {
              this.logger.log("缓存未命中", { keyword, language });
              return null;
            }
            if (Date.now() - cacheItem.value.timestamp > cacheItem.value.expiresIn) {
              this.logger.log("缓存已过期", { keyword, language });
              await this.remove(cacheKey);
              return null;
            }
            this.logger.log("缓存命中", {
              keyword,
              language,
              count: cacheItem.value.subtitles.length,
              cacheItem: cacheItem.value
            });
            return cacheItem.value.subtitles;
          } catch (error) {
            this.logger.error("获取缓存失败", error);
            return null;
          }
        }
        async addCache(keyword, language, subtitles, expiresIn = this.DEFAULT_EXPIRES_IN) {
          try {
            const cacheKey = this.getCacheKey(keyword, language);
            const cacheItem = {
              subtitles,
              timestamp: Date.now(),
              expiresIn
            };
            await super.set(cacheKey, cacheItem);
            this.logger.log("设置缓存成功", {
              keyword,
              language,
              count: subtitles.length
            });
          } catch (error) {
            this.logger.error("设置缓存失败", error);
          }
        }
        // 清除所有缓存
        async clear() {
          try {
            await super.clear();
            this.logger.log("清除所有缓存成功");
          } catch (error) {
            this.logger.error("清除缓存失败", error);
          }
        }
      }
      const subtitleCache = exports("s", new SubtitleCache());
      const STORE_PREFIX = "subtitle_preference";
      class SubtitlePreferenceManager extends CacheCore {
        constructor() {
          super({
            storeName: STORE_PREFIX,
            enableQuotaManagement: false
          });
        }
        getStoreKey(videoName) {
          const cleanName = videoName.replace(/\.[^/.]+$/, "").trim();
          return `${STORE_PREFIX}${cleanName}`;
        }
        async savePreference(pickcode, subtitle) {
          try {
            const key = this.getStoreKey(pickcode);
            if (subtitle) {
              await this.set(key, subtitle);
            } else {
              await this.remove(key);
            }
          } catch (error) {
            console.error("保存字幕偏好失败", error);
          }
        }
        async getPreference(pickcode) {
          try {
            const key = this.getStoreKey(pickcode);
            const preference = await this.get(key);
            return (preference == null ? void 0 : preference.value) ?? null;
          } catch (error) {
            return null;
          }
        }
      }
      const subtitlePreference = exports("e", new SubtitlePreferenceManager());
      const logger = new AppLogger("getAvNumber");
      function getAvNumber(filename) {
        const name = filename;
        const cleanName = name.replace(/^\[?([\w_]+\.)+[A-Za-z]+\]?@?/g, "").replace(/\.[\w]+$/, "").replace(/[\u4E00-\u9FA5]/g, "").replace(/[\u3040-\u309F\u30A0-\u30FF]/g, "").replace(/BDRIP|HDR/gi, "").replace(/@\w+@/, "").replace(/share_[\w]{32}/, "");
        logger.log("清理干扰字符", `before:${name} -> after:${cleanName}`);
        const patterns = [
          // FC2系列 (如 FC2-PPV-123456)
          {
            name: "FC2系列",
            pattern: /fc2[^\d]*(?:ppv)?[^\d]*(\d{6,7})/i,
            format: (m) => `FC2-PPV-${m[1]}`
          },
          // HEYZO系列 (如 HEYZO-1234)
          {
            name: "HEYZO系列",
            pattern: /heyzo[^\d]*(\d{4})/i,
            format: (m) => `HEYZO-${m[1]}`
          },
          // 麻豆系列 (如 MDX-0123, MKY-NS-001)
          {
            name: "麻豆系列",
            pattern: /(mdx|mky|md)[^\d]*(?:ns)?[^\d]*(\d{3,4})/i,
            format: (m) => {
              const prefix = m[1].toUpperCase();
              const hasNS = cleanName.toLowerCase().includes("ns");
              return `${prefix}${hasNS ? "-NS" : ""}-${m[2]}`;
            }
          },
          // Pacopacomama or 10musume系列 (如 10musume-123114_01、pacopacomama-123114_01)
          {
            name: "一本道系列 or Pacopacomama or 10musume系列",
            pattern: /(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])([0-9]{2})([\s|_]*)(\d{2,3})/i,
            format: (m) => m[0].replace(/\s|_/g, "_")
          },
          // Heydouga系列 (如 heydouga-4037-123)
          {
            name: "Heydouga系列",
            pattern: /heydouga[\s|-](\d{4})[\s|-]*(\d{3,4})/i,
            format: (m) => `${m[1]}-${m[2]}`
          },
          // 加勒比系列 (如 carib-123-456)
          {
            name: "加勒比系列",
            pattern: /(?:carib|caribbean)[^\d]*(\d{3})[^\d]*(\d{3})/i,
            format: (m) => `CARIB-${m[1]}-${m[2]}`
          },
          // 东京热系列 (如 tokyo-hot-n1234)
          {
            name: "东京热系列",
            pattern: /tokyo[^\d]*hot[^\d]*([a-z])(\d{4})/i,
            format: (m) => `TOKYO-HOT-${m[1].toUpperCase()}${m[2]}`
          },
          // 特殊格式：字母数字混合 (如 T28-123)
          {
            name: "特殊格式：字母数字混合",
            pattern: /([a-zA-Z]+\d{1,2})-(\d{3})/i,
            format: (m) => `${m[1].toUpperCase()}-${m[2]}`
          },
          // 标准格式：字母-数字 (如 ABC-123, ABCD-12345)
          {
            name: "标准格式：字母-数字",
            pattern: /(?:^|[^a-zA-Z])([a-zA-Z]{2,5})[-]?(\d{2,5})(?:c|-c)?(?:[^a-zA-Z]|$)/i,
            format: (m) => {
              return `${m[1].toUpperCase()}-${m[2]}`;
            }
          }
        ];
        for (const { name: name2, pattern, format } of patterns) {
          const match = cleanName.match(pattern);
          if (match) {
            logger.log("match name", name2);
            logger.log("match regexp", pattern.toString());
            const result = format(match);
            logger.log("找到番号^^^", result, name2);
            return result;
          }
        }
        logger.log("找不到番号");
        return null;
      }
      async function compressImage(blob, options = {}) {
        const {
          maxWidth = 200,
          maxHeight = 200,
          quality = 0.8,
          type = "image/jpeg"
        } = options;
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;
            if (width > height) {
              if (width > maxWidth) {
                height = Math.round(height * (maxWidth / width));
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width = Math.round(width * (maxHeight / height));
                height = maxHeight;
              }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              reject(new Error("无法获取Canvas上下文"));
              return;
            }
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(
              (result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(new Error("图片压缩失败"));
                }
              },
              type,
              quality
            );
          };
          img.onerror = () => {
            reject(new Error("图片加载失败"));
          };
          img.src = URL.createObjectURL(blob);
        });
      }
      const imageBitmapToBlob = async (imageBitmap, quality = 0.85) => {
        const canvas = document.createElement("canvas");
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          throw new Error("无法创建Canvas上下文");
        }
        ctx.drawImage(imageBitmap, 0, 0);
        return new Promise((resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("无法创建Blob"));
              }
            },
            "image/webp",
            quality
          );
        });
      };
      const isBlackFrame = async (imageBitmap) => {
        const canvas = document.createElement("canvas");
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return false;
        }
        ctx.drawImage(imageBitmap, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        const sampleStep = 10;
        const brightnessThreshold = 30;
        const darkPixelRatio = 0.95;
        let darkPixels = 0;
        let totalSamples = 0;
        let totalBrightness = 0;
        for (let y = 0; y < canvas.height; y += sampleStep) {
          for (let x = 0; x < canvas.width; x += sampleStep) {
            const i2 = (y * canvas.width + x) * 4;
            const r = pixels[i2];
            const g = pixels[i2 + 1];
            const b = pixels[i2 + 2];
            const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            totalBrightness += brightness;
            if (brightness <= brightnessThreshold) {
              darkPixels++;
            }
            totalSamples++;
          }
        }
        const darkRatio = darkPixels / totalSamples;
        const avgBrightness = totalBrightness / totalSamples;
        return darkRatio >= darkPixelRatio && avgBrightness <= 25;
      };
      const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              resolve(reader.result);
            } else {
              reject(new Error("转换Blob到Base64失败"));
            }
          };
          reader.onerror = () => {
            reject(new Error("读取Blob失败"));
          };
          reader.readAsDataURL(blob);
        });
      };
      function getImageSize(base64) {
        const img = new Image();
        img.src = base64;
        return new Promise((resolve, reject) => {
          img.onload = () => {
            resolve({ width: img.width, height: img.height });
          };
          img.onerror = () => {
            reject(new Error("图片加载失败"));
          };
        });
      }
      function tryOnScopeDispose(fn) {
        if (getCurrentScope()) {
          onScopeDispose(fn);
          return true;
        }
        return false;
      }
      const isClient = typeof window !== "undefined" && typeof document !== "undefined";
      typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
      const isDef = (val) => typeof val !== "undefined";
      const notNullish = (val) => val != null;
      const toString = Object.prototype.toString;
      const isObject = (val) => toString.call(val) === "[object Object]";
      const noop = () => {
      };
      const isIOS = /* @__PURE__ */ getIsIOS();
      function getIsIOS() {
        var _a, _b;
        return isClient && ((_a = window == null ? undefined : window.navigator) == null ? undefined : _a.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((_b = window == null ? undefined : window.navigator) == null ? undefined : _b.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? undefined : window.navigator.userAgent));
      }
      function createFilterWrapper(filter, fn) {
        function wrapper(...args) {
          return new Promise((resolve, reject) => {
            Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve).catch(reject);
          });
        }
        return wrapper;
      }
      const bypassFilter = (invoke) => {
        return invoke();
      };
      function throttleFilter(...args) {
        let lastExec = 0;
        let timer;
        let isLeading = true;
        let lastRejector = noop;
        let lastValue;
        let ms;
        let trailing;
        let leading;
        let rejectOnCancel;
        if (!isRef(args[0]) && typeof args[0] === "object")
          ({ delay: ms, trailing = true, leading = true, rejectOnCancel = false } = args[0]);
        else
          [ms, trailing = true, leading = true, rejectOnCancel = false] = args;
        const clear = () => {
          if (timer) {
            clearTimeout(timer);
            timer = undefined;
            lastRejector();
            lastRejector = noop;
          }
        };
        const filter = (_invoke) => {
          const duration2 = toValue(ms);
          const elapsed = Date.now() - lastExec;
          const invoke = () => {
            return lastValue = _invoke();
          };
          clear();
          if (duration2 <= 0) {
            lastExec = Date.now();
            return invoke();
          }
          if (elapsed > duration2 && (leading || !isLeading)) {
            lastExec = Date.now();
            invoke();
          } else if (trailing) {
            lastValue = new Promise((resolve, reject) => {
              lastRejector = rejectOnCancel ? reject : resolve;
              timer = setTimeout(() => {
                lastExec = Date.now();
                isLeading = true;
                resolve(invoke());
                clear();
              }, Math.max(0, duration2 - elapsed));
            });
          }
          if (!leading && !timer)
            timer = setTimeout(() => isLeading = true, duration2);
          isLeading = false;
          return lastValue;
        };
        return filter;
      }
      function pausableFilter(extendFilter = bypassFilter, options = {}) {
        const {
          initialState = "active"
        } = options;
        const isActive = toRef(initialState === "active");
        function pause() {
          isActive.value = false;
        }
        function resume() {
          isActive.value = true;
        }
        const eventFilter = (...args) => {
          if (isActive.value)
            extendFilter(...args);
        };
        return { isActive: readonly(isActive), pause, resume, eventFilter };
      }
      function promiseTimeout(ms, throwOnTimeout = false, reason = "Timeout") {
        return new Promise((resolve, reject) => {
          if (throwOnTimeout)
            setTimeout(() => reject(reason), ms);
          else
            setTimeout(resolve, ms);
        });
      }
      function getLifeCycleTarget(target) {
        return getCurrentInstance();
      }
      function toArray(value) {
        return Array.isArray(value) ? value : [value];
      }
      function toRef(...args) {
        if (args.length !== 1)
          return toRef$1(...args);
        const r = args[0];
        return typeof r === "function" ? readonly(customRef(() => ({ get: r, set: noop }))) : ref(r);
      }
      function useThrottleFn(fn, ms = 200, trailing = false, leading = true, rejectOnCancel = false) {
        return createFilterWrapper(
          throttleFilter(ms, trailing, leading, rejectOnCancel),
          fn
        );
      }
      function watchWithFilter(source, cb, options = {}) {
        const {
          eventFilter = bypassFilter,
          ...watchOptions
        } = options;
        return watch(
          source,
          createFilterWrapper(
            eventFilter,
            cb
          ),
          watchOptions
        );
      }
      function watchPausable(source, cb, options = {}) {
        const {
          eventFilter: filter,
          initialState = "active",
          ...watchOptions
        } = options;
        const { eventFilter, pause, resume, isActive } = pausableFilter(filter, { initialState });
        const stop = watchWithFilter(
          source,
          cb,
          {
            ...watchOptions,
            eventFilter
          }
        );
        return { stop, pause, resume, isActive };
      }
      function tryOnMounted(fn, sync = true, target) {
        const instance = getLifeCycleTarget();
        if (instance)
          onMounted(fn, target);
        else if (sync)
          fn();
        else
          nextTick(fn);
      }
      function tryOnUnmounted(fn, target) {
        const instance = getLifeCycleTarget();
        if (instance)
          onUnmounted(fn, target);
      }
      function createUntil(r, isNot = false) {
        function toMatch(condition, { flush = "sync", deep = false, timeout, throwOnTimeout } = {}) {
          let stop = null;
          const watcher = new Promise((resolve) => {
            stop = watch(
              r,
              (v) => {
                if (condition(v) !== isNot) {
                  if (stop)
                    stop();
                  else
                    nextTick(() => stop == null ? undefined : stop());
                  resolve(v);
                }
              },
              {
                flush,
                deep,
                immediate: true
              }
            );
          });
          const promises = [watcher];
          if (timeout != null) {
            promises.push(
              promiseTimeout(timeout, throwOnTimeout).then(() => toValue(r)).finally(() => stop == null ? undefined : stop())
            );
          }
          return Promise.race(promises);
        }
        function toBe(value, options) {
          if (!isRef(value))
            return toMatch((v) => v === value, options);
          const { flush = "sync", deep = false, timeout, throwOnTimeout } = options != null ? options : {};
          let stop = null;
          const watcher = new Promise((resolve) => {
            stop = watch(
              [r, value],
              ([v1, v2]) => {
                if (isNot !== (v1 === v2)) {
                  if (stop)
                    stop();
                  else
                    nextTick(() => stop == null ? undefined : stop());
                  resolve(v1);
                }
              },
              {
                flush,
                deep,
                immediate: true
              }
            );
          });
          const promises = [watcher];
          if (timeout != null) {
            promises.push(
              promiseTimeout(timeout, throwOnTimeout).then(() => toValue(r)).finally(() => {
                stop == null ? undefined : stop();
                return toValue(r);
              })
            );
          }
          return Promise.race(promises);
        }
        function toBeTruthy(options) {
          return toMatch((v) => Boolean(v), options);
        }
        function toBeNull(options) {
          return toBe(null, options);
        }
        function toBeUndefined(options) {
          return toBe(undefined, options);
        }
        function toBeNaN(options) {
          return toMatch(Number.isNaN, options);
        }
        function toContains(value, options) {
          return toMatch((v) => {
            const array = Array.from(v);
            return array.includes(value) || array.includes(toValue(value));
          }, options);
        }
        function changed(options) {
          return changedTimes(1, options);
        }
        function changedTimes(n = 1, options) {
          let count = -1;
          return toMatch(() => {
            count += 1;
            return count >= n;
          }, options);
        }
        if (Array.isArray(toValue(r))) {
          const instance = {
            toMatch,
            toContains,
            changed,
            changedTimes,
            get not() {
              return createUntil(r, !isNot);
            }
          };
          return instance;
        } else {
          const instance = {
            toMatch,
            toBe,
            toBeTruthy,
            toBeNull,
            toBeNaN,
            toBeUndefined,
            changed,
            changedTimes,
            get not() {
              return createUntil(r, !isNot);
            }
          };
          return instance;
        }
      }
      function until(r) {
        return createUntil(r);
      }
      function watchImmediate(source, cb, options) {
        return watch(
          source,
          cb,
          {
            ...options,
            immediate: true
          }
        );
      }
      function watchOnce(source, cb, options) {
        const stop = watch(source, (...args) => {
          nextTick(() => stop());
          return cb(...args);
        }, options);
        return stop;
      }
      const defaultWindow = isClient ? window : undefined;
      const defaultDocument = isClient ? window.document : undefined;
      function unrefElement(elRef) {
        var _a;
        const plain = toValue(elRef);
        return (_a = plain == null ? undefined : plain.$el) != null ? _a : plain;
      }
      function useEventListener(...args) {
        const cleanups = [];
        const cleanup = () => {
          cleanups.forEach((fn) => fn());
          cleanups.length = 0;
        };
        const register = (el, event, listener, options) => {
          el.addEventListener(event, listener, options);
          return () => el.removeEventListener(event, listener, options);
        };
        const firstParamTargets = computed(() => {
          const test = toArray(toValue(args[0])).filter((e) => e != null);
          return test.every((e) => typeof e !== "string") ? test : undefined;
        });
        const stopWatch = watchImmediate(
          () => {
            var _a, _b;
            return [
              (_b = (_a = firstParamTargets.value) == null ? undefined : _a.map((e) => unrefElement(e))) != null ? _b : [defaultWindow].filter((e) => e != null),
              toArray(toValue(firstParamTargets.value ? args[1] : args[0])),
              toArray(unref(firstParamTargets.value ? args[2] : args[1])),
              // @ts-expect-error - TypeScript gets the correct types, but somehow still complains
              toValue(firstParamTargets.value ? args[3] : args[2])
            ];
          },
          ([raw_targets, raw_events, raw_listeners, raw_options]) => {
            cleanup();
            if (!(raw_targets == null ? undefined : raw_targets.length) || !(raw_events == null ? undefined : raw_events.length) || !(raw_listeners == null ? undefined : raw_listeners.length))
              return;
            const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
            cleanups.push(
              ...raw_targets.flatMap(
                (el) => raw_events.flatMap(
                  (event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone))
                )
              )
            );
          },
          { flush: "post" }
        );
        const stop = () => {
          stopWatch();
          cleanup();
        };
        tryOnScopeDispose(cleanup);
        return stop;
      }
      let _iOSWorkaround = false;
      function onClickOutside(target, handler, options = {}) {
        const { window: window2 = defaultWindow, ignore = [], capture = true, detectIframe = false, controls = false } = options;
        if (!window2) {
          return controls ? { stop: noop, cancel: noop, trigger: noop } : noop;
        }
        if (isIOS && !_iOSWorkaround) {
          _iOSWorkaround = true;
          const listenerOptions = { passive: true };
          Array.from(window2.document.body.children).forEach((el) => useEventListener(el, "click", noop, listenerOptions));
          useEventListener(window2.document.documentElement, "click", noop, listenerOptions);
        }
        let shouldListen = true;
        const shouldIgnore = (event) => {
          return toValue(ignore).some((target2) => {
            if (typeof target2 === "string") {
              return Array.from(window2.document.querySelectorAll(target2)).some((el) => el === event.target || event.composedPath().includes(el));
            } else {
              const el = unrefElement(target2);
              return el && (event.target === el || event.composedPath().includes(el));
            }
          });
        };
        function hasMultipleRoots(target2) {
          const vm = toValue(target2);
          return vm && vm.$.subTree.shapeFlag === 16;
        }
        function checkMultipleRoots(target2, event) {
          const vm = toValue(target2);
          const children = vm.$.subTree && vm.$.subTree.children;
          if (children == null || !Array.isArray(children))
            return false;
          return children.some((child) => child.el === event.target || event.composedPath().includes(child.el));
        }
        const listener = (event) => {
          const el = unrefElement(target);
          if (event.target == null)
            return;
          if (!(el instanceof Element) && hasMultipleRoots(target) && checkMultipleRoots(target, event))
            return;
          if (!el || el === event.target || event.composedPath().includes(el))
            return;
          if ("detail" in event && event.detail === 0)
            shouldListen = !shouldIgnore(event);
          if (!shouldListen) {
            shouldListen = true;
            return;
          }
          handler(event);
        };
        let isProcessingClick = false;
        const cleanup = [
          useEventListener(window2, "click", (event) => {
            if (!isProcessingClick) {
              isProcessingClick = true;
              setTimeout(() => {
                isProcessingClick = false;
              }, 0);
              listener(event);
            }
          }, { passive: true, capture }),
          useEventListener(window2, "pointerdown", (e) => {
            const el = unrefElement(target);
            shouldListen = !shouldIgnore(e) && !!(el && !e.composedPath().includes(el));
          }, { passive: true }),
          detectIframe && useEventListener(window2, "blur", (event) => {
            setTimeout(() => {
              var _a;
              const el = unrefElement(target);
              if (((_a = window2.document.activeElement) == null ? undefined : _a.tagName) === "IFRAME" && !(el == null ? undefined : el.contains(window2.document.activeElement))) {
                handler(event);
              }
            }, 0);
          }, { passive: true })
        ].filter(Boolean);
        const stop = () => cleanup.forEach((fn) => fn());
        if (controls) {
          return {
            stop,
            cancel: () => {
              shouldListen = false;
            },
            trigger: (event) => {
              shouldListen = true;
              listener(event);
              shouldListen = false;
            }
          };
        }
        return stop;
      }
      function useMounted() {
        const isMounted = shallowRef(false);
        const instance = getCurrentInstance();
        if (instance) {
          onMounted(() => {
            isMounted.value = true;
          }, instance);
        }
        return isMounted;
      }
      function useSupported(callback) {
        const isMounted = useMounted();
        return computed(() => {
          isMounted.value;
          return Boolean(callback());
        });
      }
      function useMutationObserver(target, callback, options = {}) {
        const { window: window2 = defaultWindow, ...mutationOptions } = options;
        let observer;
        const isSupported = useSupported(() => window2 && "MutationObserver" in window2);
        const cleanup = () => {
          if (observer) {
            observer.disconnect();
            observer = undefined;
          }
        };
        const targets = computed(() => {
          const value = toValue(target);
          const items = toArray(value).map(unrefElement).filter(notNullish);
          return new Set(items);
        });
        const stopWatch = watch(
          () => targets.value,
          (targets2) => {
            cleanup();
            if (isSupported.value && targets2.size) {
              observer = new MutationObserver(callback);
              targets2.forEach((el) => observer.observe(el, mutationOptions));
            }
          },
          { immediate: true, flush: "post" }
        );
        const takeRecords = () => {
          return observer == null ? undefined : observer.takeRecords();
        };
        const stop = () => {
          stopWatch();
          cleanup();
        };
        tryOnScopeDispose(stop);
        return {
          isSupported,
          stop,
          takeRecords
        };
      }
      function useAsyncState(promise, initialState, options) {
        const {
          immediate = true,
          delay = 0,
          onError = noop,
          onSuccess = noop,
          resetOnExecute = true,
          shallow = true,
          throwError
        } = options != null ? options : {};
        const state = shallow ? shallowRef(initialState) : ref(initialState);
        const isReady = shallowRef(false);
        const isLoading = shallowRef(false);
        const error = shallowRef(undefined);
        async function execute(delay2 = 0, ...args) {
          if (resetOnExecute)
            state.value = initialState;
          error.value = undefined;
          isReady.value = false;
          isLoading.value = true;
          if (delay2 > 0)
            await promiseTimeout(delay2);
          const _promise = typeof promise === "function" ? promise(...args) : promise;
          try {
            const data = await _promise;
            state.value = data;
            isReady.value = true;
            onSuccess(data);
          } catch (e) {
            error.value = e;
            onError(e);
            if (throwError)
              throw e;
          } finally {
            isLoading.value = false;
          }
          return state.value;
        }
        if (immediate) {
          execute(delay);
        }
        const shell = {
          state,
          isReady,
          isLoading,
          error,
          execute
        };
        function waitUntilIsLoaded() {
          return new Promise((resolve, reject) => {
            until(isLoading).toBe(false).then(() => resolve(shell)).catch(reject);
          });
        }
        return {
          ...shell,
          then(onFulfilled, onRejected) {
            return waitUntilIsLoaded().then(onFulfilled, onRejected);
          }
        };
      }
      function cloneFnJSON(source) {
        return JSON.parse(JSON.stringify(source));
      }
      const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
      const globalKey = "__vueuse_ssr_handlers__";
      const handlers = /* @__PURE__ */ getHandlers();
      function getHandlers() {
        if (!(globalKey in _global))
          _global[globalKey] = _global[globalKey] || {};
        return _global[globalKey];
      }
      function getSSRHandler(key, fallback) {
        return handlers[key] || fallback;
      }
      function guessSerializerType(rawInit) {
        return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
      }
      const StorageSerializers = {
        boolean: {
          read: (v) => v === "true",
          write: (v) => String(v)
        },
        object: {
          read: (v) => JSON.parse(v),
          write: (v) => JSON.stringify(v)
        },
        number: {
          read: (v) => Number.parseFloat(v),
          write: (v) => String(v)
        },
        any: {
          read: (v) => v,
          write: (v) => String(v)
        },
        string: {
          read: (v) => v,
          write: (v) => String(v)
        },
        map: {
          read: (v) => new Map(JSON.parse(v)),
          write: (v) => JSON.stringify(Array.from(v.entries()))
        },
        set: {
          read: (v) => new Set(JSON.parse(v)),
          write: (v) => JSON.stringify(Array.from(v))
        },
        date: {
          read: (v) => new Date(v),
          write: (v) => v.toISOString()
        }
      };
      const customStorageEventName = "vueuse-storage";
      function useStorage(key, defaults2, storage, options = {}) {
        var _a;
        const {
          flush = "pre",
          deep = true,
          listenToStorageChanges = true,
          writeDefaults = true,
          mergeDefaults = false,
          shallow,
          window: window2 = defaultWindow,
          eventFilter,
          onError = (e) => {
            console.error(e);
          },
          initOnMounted
        } = options;
        const data = (shallow ? shallowRef : ref)(typeof defaults2 === "function" ? defaults2() : defaults2);
        const keyComputed = computed(() => toValue(key));
        if (!storage) {
          try {
            storage = getSSRHandler("getDefaultStorage", () => {
              var _a2;
              return (_a2 = defaultWindow) == null ? void 0 : _a2.localStorage;
            })();
          } catch (e) {
            onError(e);
          }
        }
        if (!storage)
          return data;
        const rawInit = toValue(defaults2);
        const type = guessSerializerType(rawInit);
        const serializer = (_a = options.serializer) != null ? _a : StorageSerializers[type];
        const { pause: pauseWatch, resume: resumeWatch } = watchPausable(
          data,
          () => write(data.value),
          { flush, deep, eventFilter }
        );
        watch(keyComputed, () => update(), { flush });
        if (window2 && listenToStorageChanges) {
          tryOnMounted(() => {
            if (storage instanceof Storage)
              useEventListener(window2, "storage", update, { passive: true });
            else
              useEventListener(window2, customStorageEventName, updateFromCustomEvent);
            if (initOnMounted)
              update();
          });
        }
        if (!initOnMounted)
          update();
        function dispatchWriteEvent(oldValue, newValue) {
          if (window2) {
            const payload = {
              key: keyComputed.value,
              oldValue,
              newValue,
              storageArea: storage
            };
            window2.dispatchEvent(storage instanceof Storage ? new StorageEvent("storage", payload) : new CustomEvent(customStorageEventName, {
              detail: payload
            }));
          }
        }
        function write(v) {
          try {
            const oldValue = storage.getItem(keyComputed.value);
            if (v == null) {
              dispatchWriteEvent(oldValue, null);
              storage.removeItem(keyComputed.value);
            } else {
              const serialized = serializer.write(v);
              if (oldValue !== serialized) {
                storage.setItem(keyComputed.value, serialized);
                dispatchWriteEvent(oldValue, serialized);
              }
            }
          } catch (e) {
            onError(e);
          }
        }
        function read(event) {
          const rawValue = event ? event.newValue : storage.getItem(keyComputed.value);
          if (rawValue == null) {
            if (writeDefaults && rawInit != null)
              storage.setItem(keyComputed.value, serializer.write(rawInit));
            return rawInit;
          } else if (!event && mergeDefaults) {
            const value = serializer.read(rawValue);
            if (typeof mergeDefaults === "function")
              return mergeDefaults(value, rawInit);
            else if (type === "object" && !Array.isArray(value))
              return { ...rawInit, ...value };
            return value;
          } else if (typeof rawValue !== "string") {
            return rawValue;
          } else {
            return serializer.read(rawValue);
          }
        }
        function update(event) {
          if (event && event.storageArea !== storage)
            return;
          if (event && event.key == null) {
            data.value = rawInit;
            return;
          }
          if (event && event.key !== keyComputed.value)
            return;
          pauseWatch();
          try {
            if ((event == null ? void 0 : event.newValue) !== serializer.write(data.value))
              data.value = read(event);
          } catch (e) {
            onError(e);
          } finally {
            if (event)
              nextTick(resumeWatch);
            else
              resumeWatch();
          }
        }
        function updateFromCustomEvent(event) {
          update(event.detail);
        }
        return data;
      }
      function useResizeObserver(target, callback, options = {}) {
        const { window: window2 = defaultWindow, ...observerOptions } = options;
        let observer;
        const isSupported = useSupported(() => window2 && "ResizeObserver" in window2);
        const cleanup = () => {
          if (observer) {
            observer.disconnect();
            observer = undefined;
          }
        };
        const targets = computed(() => {
          const _targets = toValue(target);
          return Array.isArray(_targets) ? _targets.map((el) => unrefElement(el)) : [unrefElement(_targets)];
        });
        const stopWatch = watch(
          targets,
          (els) => {
            cleanup();
            if (isSupported.value && window2) {
              observer = new ResizeObserver(callback);
              for (const _el of els) {
                if (_el)
                  observer.observe(_el, observerOptions);
              }
            }
          },
          { immediate: true, flush: "post" }
        );
        const stop = () => {
          cleanup();
          stopWatch();
        };
        tryOnScopeDispose(stop);
        return {
          isSupported,
          stop
        };
      }
      function useElementSize(target, initialSize = { width: 0, height: 0 }, options = {}) {
        const { window: window2 = defaultWindow, box: box2 = "content-box" } = options;
        const isSVG = computed(() => {
          var _a, _b;
          return (_b = (_a = unrefElement(target)) == null ? undefined : _a.namespaceURI) == null ? undefined : _b.includes("svg");
        });
        const width = ref(initialSize.width);
        const height = ref(initialSize.height);
        const { stop: stop1 } = useResizeObserver(
          target,
          ([entry]) => {
            const boxSize = box2 === "border-box" ? entry.borderBoxSize : box2 === "content-box" ? entry.contentBoxSize : entry.devicePixelContentBoxSize;
            if (window2 && isSVG.value) {
              const $elem = unrefElement(target);
              if ($elem) {
                const rect = $elem.getBoundingClientRect();
                width.value = rect.width;
                height.value = rect.height;
              }
            } else {
              if (boxSize) {
                const formatBoxSize = toArray(boxSize);
                width.value = formatBoxSize.reduce((acc, { inlineSize }) => acc + inlineSize, 0);
                height.value = formatBoxSize.reduce((acc, { blockSize }) => acc + blockSize, 0);
              } else {
                width.value = entry.contentRect.width;
                height.value = entry.contentRect.height;
              }
            }
          },
          options
        );
        tryOnMounted(() => {
          const ele = unrefElement(target);
          if (ele) {
            width.value = "offsetWidth" in ele ? ele.offsetWidth : initialSize.width;
            height.value = "offsetHeight" in ele ? ele.offsetHeight : initialSize.height;
          }
        });
        const stop2 = watch(
          () => unrefElement(target),
          (ele) => {
            width.value = ele ? initialSize.width : 0;
            height.value = ele ? initialSize.height : 0;
          }
        );
        function stop() {
          stop1();
          stop2();
        }
        return {
          width,
          height,
          stop
        };
      }
      function useIntersectionObserver(target, callback, options = {}) {
        const {
          root,
          rootMargin = "0px",
          threshold = 0,
          window: window2 = defaultWindow,
          immediate = true
        } = options;
        const isSupported = useSupported(() => window2 && "IntersectionObserver" in window2);
        const targets = computed(() => {
          const _target = toValue(target);
          return toArray(_target).map(unrefElement).filter(notNullish);
        });
        let cleanup = noop;
        const isActive = ref(immediate);
        const stopWatch = isSupported.value ? watch(
          () => [targets.value, unrefElement(root), isActive.value],
          ([targets2, root2]) => {
            cleanup();
            if (!isActive.value)
              return;
            if (!targets2.length)
              return;
            const observer = new IntersectionObserver(
              callback,
              {
                root: unrefElement(root2),
                rootMargin,
                threshold
              }
            );
            targets2.forEach((el) => el && observer.observe(el));
            cleanup = () => {
              observer.disconnect();
              cleanup = noop;
            };
          },
          { immediate, flush: "post" }
        ) : noop;
        const stop = () => {
          cleanup();
          stopWatch();
          isActive.value = false;
        };
        tryOnScopeDispose(stop);
        return {
          isSupported,
          isActive,
          pause() {
            cleanup();
            isActive.value = false;
          },
          resume() {
            isActive.value = true;
          },
          stop
        };
      }
      function useElementVisibility(element, options = {}) {
        const {
          window: window2 = defaultWindow,
          scrollTarget,
          threshold = 0,
          rootMargin,
          once = false
        } = options;
        const elementIsVisible = shallowRef(false);
        const { stop } = useIntersectionObserver(
          element,
          (intersectionObserverEntries) => {
            let isIntersecting = elementIsVisible.value;
            let latestTime = 0;
            for (const entry of intersectionObserverEntries) {
              if (entry.time >= latestTime) {
                latestTime = entry.time;
                isIntersecting = entry.isIntersecting;
              }
            }
            elementIsVisible.value = isIntersecting;
            if (once) {
              watchOnce(elementIsVisible, () => {
                stop();
              });
            }
          },
          {
            root: scrollTarget,
            window: window2,
            threshold,
            rootMargin: toValue(rootMargin)
          }
        );
        return elementIsVisible;
      }
      function useTitle(newTitle = null, options = {}) {
        var _a, _b, _c;
        const {
          document: document2 = defaultDocument,
          restoreOnUnmount = (t) => t
        } = options;
        const originalTitle = (_a = document2 == null ? undefined : document2.title) != null ? _a : "";
        const title = toRef((_b = newTitle != null ? newTitle : document2 == null ? undefined : document2.title) != null ? _b : null);
        const isReadonly2 = !!(newTitle && typeof newTitle === "function");
        function format(t) {
          if (!("titleTemplate" in options))
            return t;
          const template = options.titleTemplate || "%s";
          return typeof template === "function" ? template(t) : toValue(template).replace(/%s/g, t);
        }
        watch(
          title,
          (newValue, oldValue) => {
            if (newValue !== oldValue && document2)
              document2.title = format(newValue != null ? newValue : "");
          },
          { immediate: true }
        );
        if (options.observe && !options.titleTemplate && document2 && !isReadonly2) {
          useMutationObserver(
            (_c = document2.head) == null ? undefined : _c.querySelector("title"),
            () => {
              if (document2 && document2.title !== title.value)
                title.value = format(document2.title);
            },
            { childList: true }
          );
        }
        tryOnScopeDispose(() => {
          if (restoreOnUnmount) {
            const restoredTitle = restoreOnUnmount(originalTitle, title.value || "");
            if (restoredTitle != null && document2)
              document2.title = restoredTitle;
          }
        });
        return title;
      }
      function useVModel(props, key, emit, options = {}) {
        var _a, _b, _c;
        const {
          clone = false,
          passive = false,
          eventName,
          deep = false,
          defaultValue,
          shouldEmit
        } = options;
        const vm = getCurrentInstance();
        const _emit = emit || (vm == null ? undefined : vm.emit) || ((_a = vm == null ? undefined : vm.$emit) == null ? undefined : _a.bind(vm)) || ((_c = (_b = vm == null ? undefined : vm.proxy) == null ? undefined : _b.$emit) == null ? undefined : _c.bind(vm == null ? undefined : vm.proxy));
        let event = eventName;
        if (!key) {
          key = "modelValue";
        }
        event = event || `update:${key.toString()}`;
        const cloneFn = (val) => !clone ? val : typeof clone === "function" ? clone(val) : cloneFnJSON(val);
        const getValue2 = () => isDef(props[key]) ? cloneFn(props[key]) : defaultValue;
        const triggerEmit = (value) => {
          if (shouldEmit) {
            if (shouldEmit(value))
              _emit(event, value);
          } else {
            _emit(event, value);
          }
        };
        if (passive) {
          const initialValue = getValue2();
          const proxy = ref(initialValue);
          let isUpdating = false;
          watch(
            () => props[key],
            (v) => {
              if (!isUpdating) {
                isUpdating = true;
                proxy.value = cloneFn(v);
                nextTick(() => isUpdating = false);
              }
            }
          );
          watch(
            proxy,
            (v) => {
              if (!isUpdating && (v !== props[key] || deep))
                triggerEmit(v);
            },
            { deep }
          );
          return proxy;
        } else {
          return computed({
            get() {
              return getValue2();
            },
            set(value) {
              triggerEmit(value);
            }
          });
        }
      }
      class IRequest {
      }
      const isChrome = _GM_info.userAgentData.brands.some(
        (brand) => brand.brand === "Google Chrome"
      );
      const DEFAULT_OPTIONS = {
        cacheStatus: [200],
        cache: "no-cache"
      };
      class GMRequest extends IRequest {
        constructor(options = {}, cacheName = "gm-request-cache") {
          super();
          this.options = {};
          this.options = {
            ...DEFAULT_OPTIONS,
            ...options
          };
          this.cache = new GMRequestCache(cacheName);
        }
        async request(url, _options = {}) {
          const options = { ...this.options, ..._options };
          const urlRe = new URL(url);
          if (options.params) {
            Object.entries(options.params).forEach(([key, value]) => {
              urlRe.searchParams.set(key, value.toString());
            });
          }
          const redirect = isChrome ? options.redirect || "manual" : "follow";
          const requestUrl = urlRe.href;
          const useCache = options.cache !== "no-cache";
          if (useCache) {
            const cachedResponse = await this.cache.get(requestUrl, options);
            if (cachedResponse) {
              return cachedResponse;
            }
          }
          return new Promise((resolve, reject) => {
            _GM_xmlhttpRequest({
              method: options.method || "GET",
              url: requestUrl,
              headers: Object.fromEntries(Object.entries(options.headers || {})),
              data: options.body,
              timeout: options.timeout || 5e3,
              responseType: options.responseType,
              nocache: !useCache,
              redirect,
              onload: async (rawResponse) => {
                const headers = this.parseResponseHeaders(
                  rawResponse.responseHeaders
                );
                const responseHeaders = new Headers();
                Object.entries(headers).forEach(([key, value]) => {
                  responseHeaders.append(key, value);
                });
                const response = new Response(rawResponse.response, {
                  status: rawResponse.status,
                  statusText: rawResponse.statusText,
                  headers: responseHeaders
                });
                if (useCache) {
                  await this.cache.set(requestUrl, response.clone(), options);
                }
                resolve(response);
              },
              onerror: (e) => {
                reject(new Error("请求失败", { cause: e.error }));
              },
              ontimeout: () => {
                reject(new Error("请求超时"));
              }
            });
          });
        }
        get(url, options) {
          return this.request(url, { ...options, method: "GET" });
        }
        post(url, options) {
          return this.request(
            url,
            merge(
              {
                method: "POST",
                body: new URLSearchParams(options == null ? undefined : options.data),
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
              },
              options
            )
          );
        }
        /**
         * 清除指定 URL 的缓存
         * @param url 请求 URL
         * @param options 请求选项
         */
        async clearCache(url, options) {
          await this.cache.remove(url, options);
        }
        /**
         * 清除所有缓存
         */
        async clearAllCache() {
          await this.cache.clear();
        }
        /**
         * 获取缓存管理器
         * @returns 缓存管理器实例
         */
        getCache() {
          return this.cache;
        }
        parseResponseHeaders(headerStr) {
          const headers = {};
          if (!headerStr) return headers;
          const headerPairs = headerStr.split("\n");
          for (let i2 = 0; i2 < headerPairs.length; i2++) {
            const headerPair = headerPairs[i2].trim();
            if (headerPair) {
              const index = headerPair.indexOf(":");
              if (index > 0) {
                const key = headerPair.substring(0, index).trim();
                const val = headerPair.substring(index + 1).trim();
                headers[key.toLowerCase()] = val;
              }
            }
          }
          return headers;
        }
      }
      const GMRequestInstance = exports("G", new GMRequest());
      const _hoisted_1$5 = { class: "loading-error" };
      const _hoisted_2$5 = { class: "loading-error-text" };
      const _hoisted_3$4 = { class: "loading-error-detail" };
      const defaultMessage = "加载失败";
      const _sfc_main$6 = /* @__PURE__ */ defineComponent({
        __name: "index",
        props: {
          retryable: { type: Boolean },
          message: {},
          detail: {},
          retryText: {}
        },
        emits: ["retry"],
        setup(__props) {
          return (_ctx, _cache) => {
            return openBlock(), createElementBlock("div", _hoisted_1$5, [
              _cache[1] || (_cache[1] = createElementVNode("svg", {
                class: "loading-error-icon",
                viewBox: "0 0 24 24",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                createElementVNode("circle", {
                  class: "loading-error-circle",
                  cx: "12",
                  cy: "12",
                  r: "10",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }),
                createElementVNode("path", {
                  class: "loading-error-cross",
                  d: "M8 8L16 16M8 16L16 8",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round"
                })
              ], -1)),
              createElementVNode("span", _hoisted_2$5, [
                renderSlot(_ctx.$slots, "default", {}, () => [
                  createTextVNode(toDisplayString(_ctx.message || defaultMessage), 1)
                ], true)
              ]),
              createElementVNode("span", _hoisted_3$4, toDisplayString(_ctx.detail), 1),
              _ctx.retryable ? (openBlock(), createElementBlock("button", {
                key: 0,
                class: "loading-error-retry",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("retry"))
              }, toDisplayString(_ctx.retryText), 1)) : createCommentVNode("", true)
            ]);
          };
        }
      });
      const _export_sfc = exports("_", (sfc, props) => {
        const target = sfc.__vccOpts || sfc;
        for (const [key, val] of props) {
          target[key] = val;
        }
        return target;
      });
      const LoadingError = exports("L", /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-c2d74d07"]]));
      const _sfc_main$5 = /* @__PURE__ */ defineComponent({
        __name: "index",
        props: {
          width: { default: "100%" },
          height: { default: "16px" },
          circle: { type: Boolean, default: false },
          borderRadius: { default: "4px" },
          animated: { type: Boolean, default: true },
          mode: { default: "dark" }
        },
        setup(__props) {
          return (_ctx, _cache) => {
            return openBlock(), createElementBlock("div", {
              class: normalizeClass(["skeleton", {
                circle: _ctx.circle,
                "skeleton-animated": _ctx.animated,
                [`skeleton-${_ctx.mode}`]: _ctx.mode
              }]),
              style: normalizeStyle({
                width: _ctx.width,
                height: _ctx.height,
                borderRadius: _ctx.borderRadius
              })
            }, [
              renderSlot(_ctx.$slots, "default", {}, undefined, true)
            ], 6);
          };
        }
      });
      const Skeleton = exports("S", /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-b6953356"]]));
      const _hoisted_1$4 = { class: "image-container" };
      const _hoisted_2$4 = ["src", "origin-src", "refferer"];
      const _sfc_main$4 = /* @__PURE__ */ defineComponent({
        __name: "index",
        props: {
          referer: {},
          src: {},
          alt: {},
          skeletonMode: {},
          cache: { type: Boolean }
        },
        setup(__props) {
          const props = __props;
          const src = ref();
          const loading = ref(false);
          const error = ref(false);
          const gmRequst = new GMRequest();
          const getImageByGmRequest = async (src2) => {
            if (props.cache) {
              const cache = await imageCache.get(src2);
              if (cache) {
                return await blobToBase64(cache.value);
              }
            }
            const res = await gmRequst.get(src2, {
              headers: {
                ...props.referer ? { Referer: props.referer } : {}
              },
              responseType: "blob"
            });
            const blob = new Blob([await res.blob()], { type: "image/jpeg" });
            const compressedBlob = await compressImage(blob, {
              maxWidth: 720,
              maxHeight: 720,
              quality: 0.8,
              type: "image/webp"
            });
            props.cache && imageCache.set(props.src, compressedBlob);
            return await blobToBase64(compressedBlob);
          };
          const loadImage = async (_src) => {
            try {
              loading.value = true;
              if (props.referer) {
                const result = await getImageByGmRequest(_src);
                src.value = result;
              } else {
                src.value = _src;
              }
            } catch {
              src.value = "";
              error.value = true;
            } finally {
              loading.value = false;
            }
          };
          watch(
            () => props.src,
            async (newVal) => {
              if (newVal) {
                loadImage(newVal);
              } else {
                src.value = "";
              }
            },
            { immediate: true }
          );
          return (_ctx, _cache) => {
            return openBlock(), createElementBlock("div", _hoisted_1$4, [
              loading.value ? (openBlock(), createBlock(Skeleton, {
                key: 0,
                width: "100%",
                height: "100%",
                mode: _ctx.skeletonMode
              }, null, 8, ["mode"])) : error.value ? (openBlock(), createBlock(LoadingError, { key: 1 })) : (openBlock(), createElementBlock("img", mergeProps({
                key: 2,
                src: src.value,
                "origin-src": props.src,
                refferer: props.referer
              }, _ctx.$attrs), null, 16, _hoisted_2$4))
            ]);
          };
        }
      });
      const Image$1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-d3ce5714"]]);
      const _hoisted_1$3 = { class: "empty" };
      const _hoisted_2$3 = {
        key: 0,
        class: "empty-image"
      };
      const _hoisted_3$3 = ["src"];
      const _hoisted_4$1 = { class: "empty-description" };
      const _hoisted_5$1 = {
        key: 1,
        class: "empty-footer"
      };
      const _sfc_main$3 = /* @__PURE__ */ defineComponent({
        __name: "Empty",
        props: {
          description: { default: "暂无数据" },
          image: { default: "" },
          imageSize: { default: 100 },
          showImage: { type: Boolean, default: true }
        },
        setup(__props) {
          return (_ctx, _cache) => {
            return openBlock(), createElementBlock("div", _hoisted_1$3, [
              _ctx.showImage ? (openBlock(), createElementBlock("div", _hoisted_2$3, [
                _ctx.image ? (openBlock(), createElementBlock("img", {
                  key: 0,
                  src: _ctx.image,
                  style: normalizeStyle({ width: `${_ctx.imageSize}px` })
                }, null, 12, _hoisted_3$3)) : (openBlock(), createElementBlock("svg", {
                  key: 1,
                  style: normalizeStyle({ width: `${_ctx.imageSize}px`, height: `${_ctx.imageSize}px` }),
                  viewBox: "0 0 184 152",
                  xmlns: "http://www.w3.org/2000/svg"
                }, _cache[0] || (_cache[0] = [
                  createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-a47b59ec><g transform="translate(24 31.67)" data-v-a47b59ec><ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668" data-v-a47b59ec></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2" data-v-a47b59ec></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)" data-v-a47b59ec></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7" data-v-a47b59ec></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6" data-v-a47b59ec></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6" data-v-a47b59ec></path><g transform="translate(149.65 15.383)" fill="#FFF" data-v-a47b59ec><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" data-v-a47b59ec></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" data-v-a47b59ec></path></g></g>', 1)
                ]), 4))
              ])) : createCommentVNode("", true),
              createElementVNode("div", _hoisted_4$1, toDisplayString(_ctx.description), 1),
              _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_5$1, [
                renderSlot(_ctx.$slots, "default", {}, undefined, true)
              ])) : createCommentVNode("", true)
            ]);
          };
        }
      });
      const Empty = exports("E", /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-a47b59ec"]]));
      var duration$2 = { exports: {} };
      var duration$1 = duration$2.exports;
      var hasRequiredDuration;
      function requireDuration() {
        if (hasRequiredDuration) return duration$2.exports;
        hasRequiredDuration = 1;
        (function(module, exports) {
          !function(t, s) {
            module.exports = s();
          }(duration$1, function() {
            var t, s, n = 1e3, i2 = 6e4, e = 36e5, r = 864e5, o = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, u = 31536e6, d = 2628e6, a = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, h2 = { years: u, months: d, days: r, hours: e, minutes: i2, seconds: n, milliseconds: 1, weeks: 6048e5 }, c = function(t2) {
              return t2 instanceof g;
            }, f = function(t2, s2, n2) {
              return new g(t2, n2, s2.$l);
            }, m = function(t2) {
              return s.p(t2) + "s";
            }, l = function(t2) {
              return t2 < 0;
            }, $ = function(t2) {
              return l(t2) ? Math.ceil(t2) : Math.floor(t2);
            }, y = function(t2) {
              return Math.abs(t2);
            }, v = function(t2, s2) {
              return t2 ? l(t2) ? { negative: true, format: "" + y(t2) + s2 } : { negative: false, format: "" + t2 + s2 } : { negative: false, format: "" };
            }, g = function() {
              function l2(t2, s2, n2) {
                var i3 = this;
                if (this.$d = {}, this.$l = n2, undefined === t2 && (this.$ms = 0, this.parseFromMilliseconds()), s2) return f(t2 * h2[m(s2)], this);
                if ("number" == typeof t2) return this.$ms = t2, this.parseFromMilliseconds(), this;
                if ("object" == typeof t2) return Object.keys(t2).forEach(function(s3) {
                  i3.$d[m(s3)] = t2[s3];
                }), this.calMilliseconds(), this;
                if ("string" == typeof t2) {
                  var e2 = t2.match(a);
                  if (e2) {
                    var r2 = e2.slice(2).map(function(t3) {
                      return null != t3 ? Number(t3) : 0;
                    });
                    return this.$d.years = r2[0], this.$d.months = r2[1], this.$d.weeks = r2[2], this.$d.days = r2[3], this.$d.hours = r2[4], this.$d.minutes = r2[5], this.$d.seconds = r2[6], this.calMilliseconds(), this;
                  }
                }
                return this;
              }
              var y2 = l2.prototype;
              return y2.calMilliseconds = function() {
                var t2 = this;
                this.$ms = Object.keys(this.$d).reduce(function(s2, n2) {
                  return s2 + (t2.$d[n2] || 0) * h2[n2];
                }, 0);
              }, y2.parseFromMilliseconds = function() {
                var t2 = this.$ms;
                this.$d.years = $(t2 / u), t2 %= u, this.$d.months = $(t2 / d), t2 %= d, this.$d.days = $(t2 / r), t2 %= r, this.$d.hours = $(t2 / e), t2 %= e, this.$d.minutes = $(t2 / i2), t2 %= i2, this.$d.seconds = $(t2 / n), t2 %= n, this.$d.milliseconds = t2;
              }, y2.toISOString = function() {
                var t2 = v(this.$d.years, "Y"), s2 = v(this.$d.months, "M"), n2 = +this.$d.days || 0;
                this.$d.weeks && (n2 += 7 * this.$d.weeks);
                var i3 = v(n2, "D"), e2 = v(this.$d.hours, "H"), r2 = v(this.$d.minutes, "M"), o2 = this.$d.seconds || 0;
                this.$d.milliseconds && (o2 += this.$d.milliseconds / 1e3, o2 = Math.round(1e3 * o2) / 1e3);
                var u2 = v(o2, "S"), d2 = t2.negative || s2.negative || i3.negative || e2.negative || r2.negative || u2.negative, a2 = e2.format || r2.format || u2.format ? "T" : "", h3 = (d2 ? "-" : "") + "P" + t2.format + s2.format + i3.format + a2 + e2.format + r2.format + u2.format;
                return "P" === h3 || "-P" === h3 ? "P0D" : h3;
              }, y2.toJSON = function() {
                return this.toISOString();
              }, y2.format = function(t2) {
                var n2 = t2 || "YYYY-MM-DDTHH:mm:ss", i3 = { Y: this.$d.years, YY: s.s(this.$d.years, 2, "0"), YYYY: s.s(this.$d.years, 4, "0"), M: this.$d.months, MM: s.s(this.$d.months, 2, "0"), D: this.$d.days, DD: s.s(this.$d.days, 2, "0"), H: this.$d.hours, HH: s.s(this.$d.hours, 2, "0"), m: this.$d.minutes, mm: s.s(this.$d.minutes, 2, "0"), s: this.$d.seconds, ss: s.s(this.$d.seconds, 2, "0"), SSS: s.s(this.$d.milliseconds, 3, "0") };
                return n2.replace(o, function(t3, s2) {
                  return s2 || String(i3[t3]);
                });
              }, y2.as = function(t2) {
                return this.$ms / h2[m(t2)];
              }, y2.get = function(t2) {
                var s2 = this.$ms, n2 = m(t2);
                return "milliseconds" === n2 ? s2 %= 1e3 : s2 = "weeks" === n2 ? $(s2 / h2[n2]) : this.$d[n2], s2 || 0;
              }, y2.add = function(t2, s2, n2) {
                var i3;
                return i3 = s2 ? t2 * h2[m(s2)] : c(t2) ? t2.$ms : f(t2, this).$ms, f(this.$ms + i3 * (n2 ? -1 : 1), this);
              }, y2.subtract = function(t2, s2) {
                return this.add(t2, s2, true);
              }, y2.locale = function(t2) {
                var s2 = this.clone();
                return s2.$l = t2, s2;
              }, y2.clone = function() {
                return f(this.$ms, this);
              }, y2.humanize = function(s2) {
                return t().add(this.$ms, "ms").locale(this.$l).fromNow(!s2);
              }, y2.valueOf = function() {
                return this.asMilliseconds();
              }, y2.milliseconds = function() {
                return this.get("milliseconds");
              }, y2.asMilliseconds = function() {
                return this.as("milliseconds");
              }, y2.seconds = function() {
                return this.get("seconds");
              }, y2.asSeconds = function() {
                return this.as("seconds");
              }, y2.minutes = function() {
                return this.get("minutes");
              }, y2.asMinutes = function() {
                return this.as("minutes");
              }, y2.hours = function() {
                return this.get("hours");
              }, y2.asHours = function() {
                return this.as("hours");
              }, y2.days = function() {
                return this.get("days");
              }, y2.asDays = function() {
                return this.as("days");
              }, y2.weeks = function() {
                return this.get("weeks");
              }, y2.asWeeks = function() {
                return this.as("weeks");
              }, y2.months = function() {
                return this.get("months");
              }, y2.asMonths = function() {
                return this.as("months");
              }, y2.years = function() {
                return this.get("years");
              }, y2.asYears = function() {
                return this.as("years");
              }, l2;
            }(), p = function(t2, s2, n2) {
              return t2.add(s2.years() * n2, "y").add(s2.months() * n2, "M").add(s2.days() * n2, "d").add(s2.hours() * n2, "h").add(s2.minutes() * n2, "m").add(s2.seconds() * n2, "s").add(s2.milliseconds() * n2, "ms");
            };
            return function(n2, i3, e2) {
              t = e2, s = e2().$utils(), e2.duration = function(t2, s2) {
                var n3 = e2.locale();
                return f(t2, { $l: n3 }, s2);
              }, e2.isDuration = c;
              var r2 = i3.prototype.add, o2 = i3.prototype.subtract;
              i3.prototype.add = function(t2, s2) {
                return c(t2) ? p(this, t2, 1) : r2.bind(this)(t2, s2);
              }, i3.prototype.subtract = function(t2, s2) {
                return c(t2) ? p(this, t2, -1) : o2.bind(this)(t2, s2);
              };
            };
          });
        })(duration$2);
        return duration$2.exports;
      }
      var durationExports = requireDuration();
      const duration = /* @__PURE__ */ getDefaultExportFromCjs(durationExports);
      dayjs.extend(duration);
      const formatDate = exports("m", (timestamp) => {
        if (!timestamp) return "";
        return dayjs(timestamp).format("YYYY-MM-DD");
      });
      const formatDuration = exports("n", (minutes) => {
        if (!minutes) return "";
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        const parts = [];
        if (hours > 0) {
          parts.push(`${hours}小时`);
        }
        if (remainingMinutes > 0) {
          parts.push(`${remainingMinutes}分钟`);
        }
        return parts.join(" ");
      });
      const formatFileSize = exports("j", (bytes) => {
        if (!bytes) return "未知";
        const units = ["B", "KB", "MB", "GB", "TB"];
        let size = bytes;
        let unitIndex = 0;
        while (size >= 1024 && unitIndex < units.length - 1) {
          size /= 1024;
          unitIndex++;
        }
        return `${size.toFixed(2)} ${units[unitIndex]}`;
      });
      const PREVIEW_CACHE_KEY = "jav_cache";
      class JavCache extends CacheCore {
        constructor() {
          super({
            storeName: PREVIEW_CACHE_KEY
          });
        }
      }
      const javCache = new JavCache();
      var JAV_SOURCE = /* @__PURE__ */ ((JAV_SOURCE2) => {
        JAV_SOURCE2["JAVBUS"] = "JavBus";
        JAV_SOURCE2["JAVDB"] = "JavDB";
        JAV_SOURCE2["MISSAV"] = "MissAV";
        return JAV_SOURCE2;
      })(JAV_SOURCE || {});
      class JavNotFound extends Error {
        constructor() {
          super("未找到番号");
        }
      }
      class JavPageError extends Error {
        constructor() {
          super("请求页面错误");
        }
      }
      const _Jav = class _Jav {
        constructor() {
          this.request = new GMRequest();
          this.cache = javCache;
        }
        // 获取番号信息
        async getInfo(avNumber) {
          const info = await this.getInfoByCache(avNumber);
          if (info) {
            return info;
          }
          const infoNew = await this.getInfoByAvNumber(avNumber);
          if (infoNew) {
            this.cache.set(`${this.source}:${avNumber}`, infoNew);
          }
          return infoNew ?? undefined;
        }
        // 获取番号信息缓存
        async getInfoByCache(avNumber) {
          const info = await this.cache.get(`${this.source}:${avNumber}`);
          if (info) {
            return info.value;
          }
          return undefined;
        }
        // 解析番号信息
        async parseInfo(html) {
          var _a, _b, _c, _d, _e;
          let dom = new DOMParser().parseFromString(html, "text/html");
          try {
            dom = await this.parseInfoBefore(dom);
          } catch (e) {
            return undefined;
          }
          const info = {
            source: this.source,
            baseUrl: this.baseUrl,
            detailUrl: this.detailUrl,
            searchUrl: this.searchUrl,
            avNumber: this.parseAvNumber(dom),
            title: this.parseTitle(dom),
            date: this.parseDate(dom),
            duration: this.parseDuration(dom),
            director: this.parseDirector(dom),
            actors: this.parseActor(dom),
            studio: this.parseStudio(dom),
            publisher: this.parsePublisher(dom),
            cover: this.parseCover(dom),
            coverSingle: this.parseCoverSingle(dom),
            preview: this.parsePreview(dom),
            series: this.parseSeries(dom),
            category: this.parseCategory(dom),
            score: (_a = this.parseScore) == null ? undefined : _a.call(this, dom),
            scoreCount: (_b = this.parseScoreCount) == null ? undefined : _b.call(this, dom),
            viewCount: (_c = this.parseViewCount) == null ? undefined : _c.call(this, dom),
            downloadCount: (_d = this.parseDownloadCount) == null ? undefined : _d.call(this, dom),
            comments: (_e = this.parseComments) == null ? undefined : _e.call(this, dom)
          };
          const infoAfter = await this.parseInfoAfter(info);
          return infoAfter;
        }
        // 解析番号信息后
        async parseInfoBefore(dom) {
          return dom;
        }
        // 解析番号信息后
        async parseInfoAfter(info) {
          return Promise.resolve(info);
        }
      };
      _Jav.NotFound = JavNotFound;
      _Jav.PageError = JavPageError;
      let Jav = _Jav;
      class JavBus extends Jav {
        constructor() {
          super(...arguments);
          this.source = JAV_SOURCE.JAVBUS;
          this.baseUrl = "https://www.javbus.com";
          this.detailUrl = "";
          this.searchUrl = "";
          this.labels = {};
        }
        async getInfoByAvNumber(avNumber) {
          const detailUrl = new URL(avNumber, this.baseUrl).href;
          const searchUrl = new URL(`/search/${avNumber}`, this.baseUrl).href;
          this.detailUrl = detailUrl;
          this.searchUrl = searchUrl;
          const html = await this.request.get(detailUrl);
          if (html.status === 404) {
            throw new Jav.NotFound();
          }
          if (html.status !== 200 && html.status !== 302) {
            throw new Jav.PageError();
          }
          return await this.parseInfo(await html.text());
        }
        async parseInfoBefore(dom) {
          const errorPage = dom.querySelector(".error-page");
          if (errorPage) {
            throw new Jav.NotFound();
          }
          const labels = this.getLabels(dom);
          this.labels = labels;
          return dom;
        }
        async parseInfoAfter(info) {
          var _a;
          return {
            ...info,
            title: (_a = info.title) == null ? undefined : _a.replace(new RegExp(`^${info.avNumber}`, "i"), "").trim()
          };
        }
        getLabels(dom) {
          const headers = dom.querySelectorAll(
            ".container .movie .info p > span.header, .container .movie .info p.header"
          );
          return Object.fromEntries(
            Array.from(headers).map((i2) => {
              var _a;
              return [
                (_a = i2.textContent) == null ? undefined : _a.replace(":", "").trim(),
                i2
              ];
            })
          );
        }
        parseAvNumber() {
          var _a, _b, _c;
          return ((_c = (_b = (_a = this.labels["識別碼"]) == null ? undefined : _a.nextElementSibling) == null ? undefined : _b.textContent) == null ? undefined : _c.trim()) ?? "";
        }
        parseTitle(dom) {
          var _a, _b;
          const title = (_b = (_a = dom.querySelector(".container h3")) == null ? undefined : _a.textContent) == null ? undefined : _b.trim();
          return title;
        }
        parseDate() {
          var _a, _b;
          const date = (_b = (_a = this.labels["發行日期"]) == null ? undefined : _a.parentElement) == null ? undefined : _b.textContent;
          return date ? dayjs(date.trim().replace(/[^\d-]/g, "")).valueOf() : undefined;
        }
        parseDuration() {
          var _a, _b;
          const duration2 = (_b = (_a = this.labels["長度"]) == null ? undefined : _a.parentElement) == null ? undefined : _b.textContent;
          return duration2 ? Number(duration2.trim().replace(/[^\d]/g, "")) : undefined;
        }
        parseDirector() {
          var _a, _b;
          const directors = (_b = (_a = this.labels["導演"]) == null ? undefined : _a.parentElement) == null ? undefined : _b.querySelectorAll("a");
          return (directors == null ? undefined : directors.length) ? Array.from(directors).map((i2) => ({
            name: i2.textContent,
            url: i2.getAttribute("href") ?? undefined
          })) : undefined;
        }
        parseActor() {
          var _a, _b, _c;
          const actors = (_c = (_b = (_a = this.labels["演員"]) == null ? undefined : _a.parentElement) == null ? undefined : _b.nextElementSibling) == null ? undefined : _c.querySelectorAll(
            "li"
          );
          return (actors == null ? undefined : actors.length) ? Array.from(actors).map((i2) => {
            const a = i2.querySelector("a");
            const img = i2.querySelector("img");
            return {
              name: (img == null ? undefined : img.getAttribute("title")) ?? "",
              url: (a == null ? undefined : a.getAttribute("href")) ?? undefined,
              sex: undefined,
              face: ""
            };
          }) : undefined;
        }
        parseStudio() {
          var _a, _b;
          const studios = (_b = (_a = this.labels["製作商"]) == null ? undefined : _a.parentElement) == null ? undefined : _b.querySelectorAll("a");
          return (studios == null ? undefined : studios.length) ? Array.from(studios).map((i2) => ({
            name: i2.textContent,
            url: i2.getAttribute("href") ?? undefined
          })) : undefined;
        }
        parsePublisher() {
          var _a, _b;
          const publishers = (_b = (_a = this.labels["發行商"]) == null ? undefined : _a.parentElement) == null ? undefined : _b.querySelectorAll("a");
          return (publishers == null ? undefined : publishers.length) ? Array.from(publishers).map((i2) => ({
            name: i2.textContent,
            url: i2.getAttribute("href") ?? undefined
          })) : undefined;
        }
        parseCover(dom) {
          var _a;
          const cover = (_a = dom.querySelector(".container .bigImage img")) == null ? undefined : _a.getAttribute("src");
          if (!cover) {
            return undefined;
          }
          if (cover.includes("https://")) {
            return {
              url: cover
            };
          }
          return {
            url: new URL(cover, this.baseUrl).href,
            referer: this.detailUrl
          };
        }
        parseCoverSingle(dom) {
          var _a;
          const cover = (_a = dom.querySelector(".container .bigImage img")) == null ? undefined : _a.getAttribute("src");
          return cover ? {
            url: new URL(
              cover.replace("_b", "").replace("cover", "thumb"),
              this.baseUrl
            ).href,
            referer: this.searchUrl
          } : undefined;
        }
        parsePreview(dom) {
          const previews = dom.querySelectorAll("#sample-waterfall a");
          return previews.length ? Array.from(previews).map((preview) => {
            var _a;
            return {
              raw: preview.getAttribute("href") ?? undefined,
              thumbnail: ((_a = preview.querySelector("img")) == null ? undefined : _a.getAttribute("src")) ?? undefined
            };
          }).filter((i2) => !!i2.raw || !!i2.thumbnail).map((i2) => {
            return {
              raw: i2.raw,
              thumbnail: i2.thumbnail ? new URL(i2.thumbnail, this.baseUrl).href : undefined
            };
          }) : undefined;
        }
        parseSeries() {
          var _a, _b;
          const series = (_b = (_a = this.labels["系列"]) == null ? undefined : _a.parentElement) == null ? undefined : _b.querySelectorAll("a");
          return (series == null ? undefined : series.length) ? Array.from(series).map((i2) => ({
            name: i2.textContent,
            url: i2.getAttribute("href") ?? undefined
          })) : undefined;
        }
        parseCategory() {
          var _a, _b;
          const categories = (_b = (_a = this.labels["類別"]) == null ? undefined : _a.nextElementSibling) == null ? undefined : _b.querySelectorAll("a");
          return (categories == null ? undefined : categories.length) ? Array.from(categories).map((i2) => ({
            name: i2.textContent,
            url: i2.getAttribute("href") ?? undefined
          })) : undefined;
        }
        parseComments() {
          return [];
        }
      } exports("c", JavBus);
      class JavDB extends Jav {
        constructor() {
          super(...arguments);
          this.source = JAV_SOURCE.JAVDB;
          this.baseUrl = "https://javdb.com";
          this.detailUrl = "";
          this.searchUrl = "";
          this.labels = {};
        }
        async getInfoByAvNumber(avNumber) {
          const params = new URLSearchParams({
            q: avNumber
          });
          const searchUrl = new URL(`/search?${params.toString()}`, this.baseUrl).href;
          this.searchUrl = searchUrl;
          const html = await this.request.get(searchUrl);
          if (html.status === 404) {
            throw new Jav.NotFound();
          }
          if (html.status !== 200 && html.status !== 302) {
            throw new Jav.PageError();
          }
          const detailUrl = this.getDetailUrl(await html.text());
          if (!detailUrl) {
            throw new Jav.PageError();
          }
          this.detailUrl = detailUrl;
          const avNumberPageResponse = await this.request.get(detailUrl);
          if (avNumberPageResponse.status === 404) {
            throw new Jav.NotFound();
          }
          if (avNumberPageResponse.status !== 200 && avNumberPageResponse.status !== 302) {
            throw new Jav.PageError();
          }
          return await this.parseInfo(await avNumberPageResponse.text());
        }
        getDetailUrl(html) {
          var _a;
          const dom = new DOMParser().parseFromString(html, "text/html");
          const page = (_a = dom.querySelector(".movie-list .item a")) == null ? undefined : _a.getAttribute("href");
          return page ? new URL(page, this.baseUrl).href : undefined;
        }
        async parseInfoBefore(dom) {
          const labels = this.getLabels(dom);
          this.labels = labels;
          return dom;
        }
        getLabels(dom) {
          const headers = dom.querySelectorAll(".container .panel-block strong");
          return Object.fromEntries(
            Array.from(headers).map((i2) => {
              var _a;
              return [
                (_a = i2.textContent) == null ? undefined : _a.replace(":", "").trim(),
                i2
              ];
            })
          );
        }
        parseAvNumber() {
          var _a, _b, _c, _d;
          const avNumber = (_d = (_c = (_b = (_a = this.labels["番號"]) == null ? undefined : _a.parentElement) == null ? undefined : _b.querySelector(".value")) == null ? undefined : _c.textContent) == null ? undefined : _d.trim();
          return avNumber ?? undefined;
        }
        parseTitle(dom) {
          var _a, _b;
          const title = (_b = (_a = dom.querySelector(".current-title")) == null ? undefined : _a.textContent) == null ? undefined : _b.trim();
          return title ?? undefined;
        }
        parseDate() {
          var _a, _b, _c, _d;
          const date = (_d = (_c = (_b = (_a = this.labels["日期"]) == null ? undefined : _a.parentElement) == null ? undefined : _b.querySelector(".value")) == null ? undefined : _c.textContent) == null ? undefined : _d.trim();
          return date ? dayjs(date.replace(/[^\d-]/g, "")).valueOf() : 0;
        }
        parseDuration() {
          var _a, _b, _c, _d;
          const duration2 = (_d = (_c = (_b = (_a = this.labels["時長"]) == null ? undefined : _a.parentElement) == null ? undefined : _b.querySelector(".value")) == null ? undefined : _c.textContent) == null ? undefined : _d.trim();
          return duration2 ? Number(duration2.replace(/[^\d]/g, "")) : 0;
        }
        parseDirector() {
          var _a, _b;
          const directors = (_b = (_a = this.labels["導演"]) == null ? undefined : _a.parentElement) == null ? undefined : _b.querySelectorAll(".value a");
          return (directors == null ? undefined : directors.length) ? Array.from(directors).map((i2) => ({
            name: i2.textContent,
            url: i2.getAttribute("href") ?? undefined
          })).map((i2) => ({
            ...i2,
            url: i2.url ? new URL(i2.url, this.baseUrl).href : undefined
          })) : undefined;
        }
        parseActor() {
          var _a, _b;
          const actors = (_b = (_a = this.labels["演員"]) == null ? undefined : _a.parentElement) == null ? undefined : _b.querySelectorAll(".value a");
          return (actors == null ? undefined : actors.length) ? Array.from(actors).map((i2) => {
            var _a2, _b2;
            const href = i2.getAttribute("href") ?? undefined;
            const url = href ? new URL(href, this.baseUrl).href : undefined;
            const file = href == null ? undefined : href.split("/").pop();
            const fileGroup = file == null ? undefined : file.slice(0, 2).toLowerCase();
            const face = `https://c0.jdbstatic.com/avatars/${fileGroup}/${file}.jpg`;
            return {
              name: i2.textContent,
              url,
              face,
              sex: ((_a2 = i2.nextElementSibling) == null ? undefined : _a2.classList.contains("female")) ? 1 : ((_b2 = i2.nextElementSibling) == null ? undefined : _b2.classList.contains("male")) ? 0 : undefined
            };
          }) : undefined;
        }
        parseStudio() {
          var _a, _b;
          const studios = (_b = (_a = this.labels["片商"]) == null ? undefined : _a.parentElement) == null ? undefined : _b.querySelectorAll(".value a");
          return (studios == null ? undefined : studios.length) ? Array.from(studios).map((i2) => ({
            name: i2.textContent,
            url: i2.getAttribute("href") ?? undefined
          })).map((i2) => ({
            ...i2,
            url: i2.url ? new URL(i2.url, this.baseUrl).href : undefined
          })) : undefined;
        }
        parsePublisher() {
          return undefined;
        }
        parseCover(dom) {
          var _a;
          const cover = (_a = dom.querySelector("img.video-cover")) == null ? undefined : _a.getAttribute("src");
          return cover ? {
            url: new URL(cover, this.baseUrl).href,
            referer: this.detailUrl
          } : undefined;
        }
        // TODO: 单页封面
        parseCoverSingle() {
          return {
            url: "",
            referer: this.detailUrl
          };
        }
        parsePreview(dom) {
          const previews = dom.querySelectorAll(".preview-images .tile-item");
          return previews.length ? Array.from(previews).map((i2) => {
            var _a;
            return {
              raw: (i2 == null ? undefined : i2.getAttribute("href")) ?? undefined,
              thumbnail: ((_a = i2.querySelector("img")) == null ? undefined : _a.getAttribute("src")) ?? undefined
            };
          }).filter((i2) => !!i2.raw || !!i2.thumbnail) : undefined;
        }
        parseSeries() {
          var _a, _b;
          const series = (_b = (_a = this.labels["系列"]) == null ? undefined : _a.parentElement) == null ? undefined : _b.querySelectorAll(".value a");
          return (series == null ? undefined : series.length) ? Array.from(series).map((i2) => ({
            name: i2.textContent,
            url: i2.getAttribute("href") ?? undefined
          })).map((i2) => ({
            ...i2,
            url: i2.url ? new URL(i2.url, this.baseUrl).href : undefined
          })) : undefined;
        }
        parseCategory() {
          var _a, _b;
          const categories = (_b = (_a = this.labels["類別"]) == null ? undefined : _a.parentElement) == null ? undefined : _b.querySelectorAll(".value a");
          return (categories == null ? undefined : categories.length) ? Array.from(categories).map((i2) => ({
            name: i2.textContent,
            url: i2.getAttribute("href") ?? undefined
          })).map((i2) => ({
            ...i2,
            url: i2.url ? new URL(i2.url, this.baseUrl).href : undefined
          })) : undefined;
        }
        parseComments(doc) {
          const comments = doc.querySelectorAll(".review-items .review-item");
          return comments.length ? Array.from(comments).map((i2) => {
            var _a, _b, _c, _d, _e, _f;
            return {
              content: (_a = i2.querySelector(".content")) == null ? undefined : _a.textContent,
              name: ((_d = (_c = (_b = i2.querySelector(".likes")) == null ? undefined : _b.nextSibling) == null ? undefined : _c.textContent) == null ? undefined : _d.trim()) ?? "",
              score: Array(i2.querySelector(".score-stars i")).length,
              time: dayjs((_e = i2.querySelector(".time")) == null ? undefined : _e.textContent).valueOf(),
              likeCount: Number((_f = i2.querySelector(".likes-count")) == null ? undefined : _f.textContent)
            };
          }) : undefined;
        }
      } exports("J", JavDB);
      class MissAV extends Jav {
        constructor() {
          super(...arguments);
          this.source = JAV_SOURCE.MISSAV;
          this.baseUrl = "https://missav.ws/cn/";
          this.detailUrl = "";
          this.searchUrl = "";
          this.labels = {};
        }
        async getInfoByAvNumber(avNumber) {
          const detailUrl = new URL(avNumber, this.baseUrl).href;
          if (!detailUrl) {
            throw new Jav.NotFound();
          }
          this.detailUrl = detailUrl;
          let avNumberPageResponse = await this.request.get(detailUrl);
          if (avNumberPageResponse.status === 301) {
            const redirectUrl = avNumberPageResponse.headers.get("location");
            if (!redirectUrl) {
              throw new Jav.PageError();
            }
            this.detailUrl = redirectUrl;
            avNumberPageResponse = await this.request.get(redirectUrl);
          }
          if (avNumberPageResponse.status === 404) {
            throw new Jav.NotFound();
          }
          if (avNumberPageResponse.status !== 200 && avNumberPageResponse.status !== 302) {
            throw new Jav.PageError();
          }
          return await this.parseInfo(await avNumberPageResponse.text());
        }
        async parseInfoBefore(dom) {
          const labels = this.getLabels(dom);
          this.labels = labels;
          return dom;
        }
        getLabels(dom) {
          const headers = dom.querySelectorAll(
            ".space-y-2 > div > span:first-of-type"
          );
          return Object.fromEntries(
            Array.from(headers).map((i2) => {
              var _a;
              return [
                (_a = i2.textContent) == null ? undefined : _a.replace(":", "").trim(),
                i2
              ];
            })
          );
        }
        parseAvNumber() {
          var _a, _b, _c;
          const avNumber = (_c = (_b = (_a = this.labels["番号"]) == null ? undefined : _a.nextElementSibling) == null ? undefined : _b.textContent) == null ? undefined : _c.trim();
          return avNumber ?? undefined;
        }
        parseTitle() {
          var _a, _b, _c;
          const title = (_c = (_b = (_a = this.labels["标题"]) == null ? undefined : _a.nextElementSibling) == null ? undefined : _b.textContent) == null ? undefined : _c.trim();
          return title ?? undefined;
        }
        parseDate() {
          var _a, _b, _c;
          const date = (_c = (_b = (_a = this.labels["日期"]) == null ? undefined : _a.nextElementSibling) == null ? undefined : _b.textContent) == null ? undefined : _c.trim();
          return date ? dayjs(date.replace(/[^\d-]/g, "")).valueOf() : 0;
        }
        parseDuration() {
          return undefined;
        }
        parseDirector() {
          var _a, _b;
          const directors = (_b = (_a = this.labels["导演"]) == null ? undefined : _a.parentElement) == null ? undefined : _b.querySelectorAll("a");
          return (directors == null ? undefined : directors.length) ? Array.from(directors).map((i2) => ({
            name: i2.textContent,
            url: i2.getAttribute("href") ?? undefined
          })) : undefined;
        }
        parseActor() {
          var _a, _b, _c, _d;
          const femaleActors = (_b = (_a = this.labels["女优"]) == null ? undefined : _a.parentElement) == null ? undefined : _b.querySelectorAll("a");
          const maleActors = (_d = (_c = this.labels["男优"]) == null ? undefined : _c.parentElement) == null ? undefined : _d.querySelectorAll("a");
          return [
            ...(femaleActors == null ? undefined : femaleActors.length) ? Array.from(femaleActors).map((i2) => ({
              name: i2.textContent,
              url: i2.getAttribute("href") ?? undefined,
              sex: 0
            })) : [],
            ...(maleActors == null ? undefined : maleActors.length) ? Array.from(maleActors).map((i2) => ({
              name: i2.textContent,
              url: i2.getAttribute("href") ?? undefined,
              sex: 1
            })) : []
          ];
        }
        parseStudio() {
          return undefined;
        }
        parsePublisher() {
          var _a, _b;
          const publisher = (_b = (_a = this.labels["发行商"]) == null ? undefined : _a.parentElement) == null ? undefined : _b.querySelectorAll("a");
          return (publisher == null ? undefined : publisher.length) ? Array.from(publisher).map((i2) => ({
            name: i2.textContent,
            url: i2.getAttribute("href") ?? undefined
          })) : undefined;
        }
        parseCover(dom) {
          var _a;
          const cover = (_a = dom.querySelector("meta[property='og:image']")) == null ? undefined : _a.getAttribute("content");
          return cover ? {
            url: cover
          } : undefined;
        }
        // TODO: 单页封面
        parseCoverSingle() {
          return undefined;
        }
        parsePreview() {
          return undefined;
        }
        parseSeries() {
          var _a, _b;
          const series = (_b = (_a = this.labels["标籤"]) == null ? undefined : _a.parentElement) == null ? undefined : _b.querySelectorAll("a");
          return (series == null ? undefined : series.length) ? Array.from(series).map((i2) => ({
            name: i2.textContent,
            url: i2.getAttribute("href") ?? undefined
          })).map((i2) => ({
            ...i2,
            url: i2.url ? new URL(i2.url, this.baseUrl).href : undefined
          })) : undefined;
        }
        parseCategory() {
          var _a, _b;
          const categories = (_b = (_a = this.labels["类型"]) == null ? undefined : _a.parentElement) == null ? undefined : _b.querySelectorAll("a");
          return (categories == null ? undefined : categories.length) ? Array.from(categories).map((i2) => ({
            name: i2.textContent,
            url: i2.getAttribute("href") ?? undefined
          })) : undefined;
        }
        parseComments() {
          return undefined;
        }
      }
      const _hoisted_1$2 = { class: "ext-info-container" };
      const _hoisted_2$2 = {
        key: 0,
        class: "ext-info-error"
      };
      const _hoisted_3$2 = { class: "ext-info-cover" };
      const _hoisted_4 = { class: "ext-info-main" };
      const _hoisted_5 = { class: "ext-info-header" };
      const _hoisted_6 = { class: "ext-info-content" };
      const _hoisted_7 = { class: "ext-info-content__group" };
      const _hoisted_8 = {
        key: 2,
        class: "ext-info-empty"
      };
      const _hoisted_9 = { class: "ext-info-cover" };
      const _hoisted_10 = ["alt"];
      const _hoisted_11 = { class: "ext-info-main" };
      const _hoisted_12 = { class: "ext-info-title" };
      const _hoisted_13 = ["href", "alt"];
      const _hoisted_14 = { class: "ext-info-content" };
      const _hoisted_15 = { class: "ext-info-content__group" };
      const _hoisted_16 = { class: "ext-info-item" };
      const _hoisted_17 = {
        key: 0,
        class: "ext-info-item-value"
      };
      const _hoisted_18 = ["href", "alt"];
      const _hoisted_19 = {
        key: 1,
        class: "ext-info-item-value"
      };
      const _hoisted_20 = { class: "ext-info-item" };
      const _hoisted_21 = {
        key: 0,
        class: "ext-info-item-value"
      };
      const _hoisted_22 = {
        key: 1,
        class: "ext-info-item-value"
      };
      const _hoisted_23 = { class: "ext-info-item" };
      const _hoisted_24 = {
        key: 0,
        class: "ext-info-item-value"
      };
      const _hoisted_25 = {
        key: 1,
        class: "ext-info-item-value"
      };
      const _hoisted_26 = { class: "ext-info-item" };
      const _hoisted_27 = ["href"];
      const _hoisted_28 = { class: "ext-info-content__group" };
      const _hoisted_29 = { class: "ext-info-item" };
      const _hoisted_30 = {
        key: 0,
        class: "ext-info-item-value"
      };
      const _hoisted_31 = ["href", "alt"];
      const _hoisted_32 = {
        key: 1,
        class: "ext-info-item-value"
      };
      const _hoisted_33 = { class: "ext-info-item" };
      const _hoisted_34 = {
        key: 0,
        class: "ext-info-item-value"
      };
      const _hoisted_35 = ["href", "alt"];
      const _hoisted_36 = {
        key: 1,
        class: "ext-info-item-value"
      };
      const _hoisted_37 = {
        key: 0,
        class: "ext-info-item"
      };
      const _hoisted_38 = {
        key: 0,
        class: "ext-info-item-value"
      };
      const _hoisted_39 = ["href", "alt"];
      const _hoisted_40 = {
        key: 1,
        class: "ext-info-item-value"
      };
      const _hoisted_41 = { class: "ext-info-av-number" };
      const _sfc_main$2 = /* @__PURE__ */ defineComponent({
        __name: "index",
        props: {
          avNumber: {}
        },
        setup(__props) {
          const javBus = new JavBus();
          const javDB = new JavDB();
          const missAV = new MissAV();
          const props = __props;
          const extInfoRef = ref();
          const extInfoRefVisible = useElementVisibility(extInfoRef, {
            once: true
          });
          watch(extInfoRefVisible, (visible) => {
            if (visible) {
              extInfo.execute(0);
            }
          });
          const extInfo = useAsyncState(
            async () => {
              const javs = [javBus, javDB, missAV];
              for (const jav of javs) {
                const info = await jav.getInfoByCache(props.avNumber);
                if (info) {
                  return info;
                }
              }
              for (const [index, jav] of Object.entries(javs)) {
                try {
                  return await jav.getInfo(props.avNumber);
                } catch (error) {
                  if (Number(index) === javs.length - 1) {
                    if (error instanceof Jav.NotFound) {
                      return null;
                    }
                    throw error;
                  }
                }
              }
            },
            null,
            {
              immediate: false
            }
          );
          onMounted(async () => {
          });
          return (_ctx, _cache) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
            return openBlock(), createElementBlock("div", {
              class: "ext-info",
              ref_key: "extInfoRef",
              ref: extInfoRef
            }, [
              createElementVNode("div", _hoisted_1$2, [
                unref(extInfo).error.value ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
                  createVNode(LoadingError, {
                    message: `获取番号 [${props.avNumber}] 失败`,
                    detail: `可能由于网络原因，请检查是否科学网络${unref(extInfo).error.value}`
                  }, null, 8, ["message", "detail"])
                ])) : unref(extInfo).isLoading.value || !unref(extInfo).isLoading.value && !unref(extInfo).isReady.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createElementVNode("div", _hoisted_3$2, [
                    createVNode(Skeleton, {
                      height: "100%",
                      width: "100%",
                      mode: "light"
                    })
                  ]),
                  createElementVNode("div", _hoisted_4, [
                    createElementVNode("div", _hoisted_5, [
                      createVNode(Skeleton, {
                        height: "24px",
                        width: "80%",
                        mode: "light"
                      })
                    ]),
                    createElementVNode("div", _hoisted_6, [
                      createElementVNode("div", _hoisted_7, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(Array.from({ length: 4 }, (_, i2) => i2), (i2) => {
                          return openBlock(), createElementBlock("div", {
                            class: "ext-info-item",
                            key: i2
                          }, [
                            createVNode(Skeleton, {
                              height: "24px",
                              width: `${200 + Math.random() * 200}px`,
                              mode: "light"
                            }, null, 8, ["width"])
                          ]);
                        }), 128))
                      ])
                    ])
                  ])
                ], 64)) : !unref(extInfo).state.value ? (openBlock(), createElementBlock("div", _hoisted_8, [
                  createVNode(Empty, {
                    style: { "padding": "0" },
                    description: `未找到番号 [${props.avNumber}] 信息`
                  }, null, 8, ["description"])
                ])) : unref(extInfo).state.value ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                  createElementVNode("div", _hoisted_9, [
                    createElementVNode("a", {
                      href: "javascript:void(0)",
                      alt: (_a = unref(extInfo).state.value) == null ? undefined : _a.title
                    }, [
                      createVNode(Image$1, {
                        "skeleton-mode": "light",
                        src: (_c = (_b = unref(extInfo).state.value) == null ? undefined : _b.cover) == null ? undefined : _c.url,
                        alt: (_d = unref(extInfo).state.value) == null ? undefined : _d.title,
                        referer: (_f = (_e = unref(extInfo).state.value) == null ? undefined : _e.cover) == null ? undefined : _f.referer,
                        cache: ""
                      }, null, 8, ["src", "alt", "referer"])
                    ], 8, _hoisted_10)
                  ]),
                  createElementVNode("div", _hoisted_11, [
                    createElementVNode("div", _hoisted_12, [
                      createElementVNode("a", {
                        href: (_g = unref(extInfo).state.value) == null ? undefined : _g.detailUrl,
                        target: "_blank",
                        alt: (_h = unref(extInfo).state.value) == null ? undefined : _h.title
                      }, toDisplayString((_i = unref(extInfo).state.value) == null ? undefined : _i.title), 9, _hoisted_13)
                    ]),
                    createElementVNode("div", _hoisted_14, [
                      createElementVNode("div", _hoisted_15, [
                        createElementVNode("div", _hoisted_16, [
                          _cache[0] || (_cache[0] = createElementVNode("span", { class: "ext-info-item-label" }, "番号", -1)),
                          ((_j = unref(extInfo).state.value) == null ? undefined : _j.avNumber) ? (openBlock(), createElementBlock("span", _hoisted_17, [
                            createElementVNode("a", {
                              href: (_k = unref(extInfo).state.value) == null ? undefined : _k.detailUrl,
                              target: "_blank",
                              alt: (_l = unref(extInfo).state.value) == null ? undefined : _l.title
                            }, toDisplayString((_m = unref(extInfo).state.value) == null ? undefined : _m.avNumber), 9, _hoisted_18)
                          ])) : (openBlock(), createElementBlock("span", _hoisted_19, "-"))
                        ]),
                        createElementVNode("div", _hoisted_20, [
                          _cache[1] || (_cache[1] = createElementVNode("span", { class: "ext-info-item-label" }, "日期", -1)),
                          ((_n = unref(extInfo).state.value) == null ? undefined : _n.date) ? (openBlock(), createElementBlock("span", _hoisted_21, toDisplayString(unref(formatDate)((_o = unref(extInfo).state.value) == null ? undefined : _o.date)), 1)) : (openBlock(), createElementBlock("span", _hoisted_22, "-"))
                        ]),
                        createElementVNode("div", _hoisted_23, [
                          _cache[2] || (_cache[2] = createElementVNode("span", { class: "ext-info-item-label" }, "时长", -1)),
                          ((_p = unref(extInfo).state.value) == null ? undefined : _p.duration) ? (openBlock(), createElementBlock("span", _hoisted_24, toDisplayString(unref(formatDuration)((_q = unref(extInfo).state.value) == null ? undefined : _q.duration)), 1)) : (openBlock(), createElementBlock("span", _hoisted_25, "-"))
                        ]),
                        createElementVNode("div", _hoisted_26, [
                          _cache[3] || (_cache[3] = createElementVNode("span", { class: "ext-info-item-label" }, "来源", -1)),
                          createElementVNode("a", {
                            class: "ext-info-item-value",
                            href: (_r = unref(extInfo).state.value) == null ? undefined : _r.baseUrl,
                            target: "_blank"
                          }, toDisplayString((_s = unref(extInfo).state.value) == null ? undefined : _s.source), 9, _hoisted_27)
                        ])
                      ]),
                      createElementVNode("div", _hoisted_28, [
                        createElementVNode("div", _hoisted_29, [
                          _cache[4] || (_cache[4] = createElementVNode("span", { class: "ext-info-item-label" }, "演员", -1)),
                          ((_t = unref(extInfo).state.value) == null ? undefined : _t.actors) ? (openBlock(), createElementBlock("span", _hoisted_30, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList((_u = unref(extInfo).state.value) == null ? undefined : _u.actors, (actor) => {
                              return openBlock(), createElementBlock("a", {
                                href: actor.url,
                                target: "_blank",
                                alt: actor.name,
                                key: actor.url
                              }, toDisplayString(actor.name), 9, _hoisted_31);
                            }), 128))
                          ])) : (openBlock(), createElementBlock("span", _hoisted_32, "-"))
                        ]),
                        createElementVNode("div", _hoisted_33, [
                          _cache[5] || (_cache[5] = createElementVNode("span", { class: "ext-info-item-label" }, "导演", -1)),
                          ((_v = unref(extInfo).state.value) == null ? undefined : _v.director) ? (openBlock(), createElementBlock("span", _hoisted_34, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList((_w = unref(extInfo).state.value) == null ? undefined : _w.director, (director) => {
                              return openBlock(), createElementBlock("a", {
                                href: director.url,
                                target: "_blank",
                                alt: director.name,
                                key: director.url
                              }, toDisplayString(director.name), 9, _hoisted_35);
                            }), 128))
                          ])) : (openBlock(), createElementBlock("span", _hoisted_36, "-"))
                        ]),
                        ((_x = unref(extInfo).state.value) == null ? undefined : _x.category) ? (openBlock(), createElementBlock("div", _hoisted_37, [
                          _cache[6] || (_cache[6] = createElementVNode("span", { class: "ext-info-item-label" }, "分类", -1)),
                          ((_y = unref(extInfo).state.value) == null ? undefined : _y.category) ? (openBlock(), createElementBlock("span", _hoisted_38, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList((_z = unref(extInfo).state.value) == null ? undefined : _z.category, (category) => {
                              return openBlock(), createElementBlock("a", {
                                href: category.url,
                                target: "_blank",
                                alt: category.name,
                                key: category.url
                              }, toDisplayString(category.name), 9, _hoisted_39);
                            }), 128))
                          ])) : (openBlock(), createElementBlock("span", _hoisted_40, "-"))
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createElementVNode("div", _hoisted_41, toDisplayString(props.avNumber), 1)
                ], 64)) : createCommentVNode("", true)
              ])
            ], 512);
          };
        }
      });
      const ExtInfo = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-46a696f1"]]);
      const scriptRel = /* @__PURE__ */ function detectScriptRel() {
        const relList = typeof document !== "undefined" && document.createElement("link").relList;
        return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
      }();
      const assetsURL = function(dep) {
        return "/" + dep;
      };
      const seen = {};
      const __vitePreload = exports("l", function preload(baseModule, deps, importerUrl) {
        let promise = Promise.resolve();
        if (deps && deps.length > 0) {
          document.getElementsByTagName("link");
          const cspNonceMeta = document.querySelector(
            "meta[property=csp-nonce]"
          );
          const cspNonce = (cspNonceMeta == null ? undefined : cspNonceMeta.nonce) || (cspNonceMeta == null ? undefined : cspNonceMeta.getAttribute("nonce"));
          promise = Promise.allSettled(
            deps.map((dep) => {
              dep = assetsURL(dep);
              if (dep in seen) return;
              seen[dep] = true;
              const isCss = dep.endsWith(".css");
              const cssSelector = isCss ? '[rel="stylesheet"]' : "";
              if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
                return;
              }
              const link = document.createElement("link");
              link.rel = isCss ? "stylesheet" : scriptRel;
              if (!isCss) {
                link.as = "script";
              }
              link.crossOrigin = "";
              link.href = dep;
              if (cspNonce) {
                link.setAttribute("nonce", cspNonce);
              }
              document.head.appendChild(link);
              if (isCss) {
                return new Promise((res, rej) => {
                  link.addEventListener("load", res);
                  link.addEventListener(
                    "error",
                    () => rej(new Error(`Unable to preload CSS for ${dep}`))
                  );
                });
              }
            })
          );
        }
        function handlePreloadError(err) {
          const e = new Event("vite:preloadError", {
            cancelable: true
          });
          e.payload = err;
          window.dispatchEvent(e);
          if (!e.defaultPrevented) {
            throw err;
          }
        }
        return promise.then((res) => {
          for (const item of res || []) {
            if (item.status !== "rejected") continue;
            handlePreloadError(item.reason);
          }
          return baseModule().catch(handlePreloadError);
        });
      });
      var mp4box_all = {};
      var hasRequiredMp4box_all;
      function requireMp4box_all() {
        if (hasRequiredMp4box_all) return mp4box_all;
        hasRequiredMp4box_all = 1;
        (function(exports) {
          var Log = /* @__PURE__ */ function() {
            var start = /* @__PURE__ */ new Date();
            var LOG_LEVEL_ERROR = 4;
            var LOG_LEVEL_WARNING = 3;
            var LOG_LEVEL_INFO = 2;
            var LOG_LEVEL_DEBUG = 1;
            var log_level = LOG_LEVEL_ERROR;
            var logObject = {
              setLogLevel: function(level) {
                if (level == this.debug) log_level = LOG_LEVEL_DEBUG;
                else if (level == this.info) log_level = LOG_LEVEL_INFO;
                else if (level == this.warn) log_level = LOG_LEVEL_WARNING;
                else if (level == this.error) log_level = LOG_LEVEL_ERROR;
                else log_level = LOG_LEVEL_ERROR;
              },
              debug: function(module, msg) {
                if (console.debug === undefined) {
                  console.debug = console.log;
                }
                if (LOG_LEVEL_DEBUG >= log_level) {
                  console.debug("[" + Log.getDurationString(/* @__PURE__ */ new Date() - start, 1e3) + "]", "[" + module + "]", msg);
                }
              },
              log: function(module, msg) {
                this.debug(module.msg);
              },
              info: function(module, msg) {
                if (LOG_LEVEL_INFO >= log_level) {
                  console.info("[" + Log.getDurationString(/* @__PURE__ */ new Date() - start, 1e3) + "]", "[" + module + "]", msg);
                }
              },
              warn: function(module, msg) {
                if (LOG_LEVEL_WARNING >= log_level) {
                  console.warn("[" + Log.getDurationString(/* @__PURE__ */ new Date() - start, 1e3) + "]", "[" + module + "]", msg);
                }
              },
              error: function(module, msg) {
                if (LOG_LEVEL_ERROR >= log_level) {
                  console.error("[" + Log.getDurationString(/* @__PURE__ */ new Date() - start, 1e3) + "]", "[" + module + "]", msg);
                }
              }
            };
            return logObject;
          }();
          Log.getDurationString = function(duration2, _timescale) {
            var neg;
            function pad(number, length) {
              var str = "" + number;
              var a = str.split(".");
              while (a[0].length < length) {
                a[0] = "0" + a[0];
              }
              return a.join(".");
            }
            if (duration2 < 0) {
              neg = true;
              duration2 = -duration2;
            } else {
              neg = false;
            }
            var timescale = _timescale || 1;
            var duration_sec = duration2 / timescale;
            var hours = Math.floor(duration_sec / 3600);
            duration_sec -= hours * 3600;
            var minutes = Math.floor(duration_sec / 60);
            duration_sec -= minutes * 60;
            var msec = duration_sec * 1e3;
            duration_sec = Math.floor(duration_sec);
            msec -= duration_sec * 1e3;
            msec = Math.floor(msec);
            return (neg ? "-" : "") + hours + ":" + pad(minutes, 2) + ":" + pad(duration_sec, 2) + "." + pad(msec, 3);
          };
          Log.printRanges = function(ranges) {
            var length = ranges.length;
            if (length > 0) {
              var str = "";
              for (var i2 = 0; i2 < length; i2++) {
                if (i2 > 0) str += ",";
                str += "[" + Log.getDurationString(ranges.start(i2)) + "," + Log.getDurationString(ranges.end(i2)) + "]";
              }
              return str;
            } else {
              return "(empty)";
            }
          };
          {
            exports.Log = Log;
          }
          var MP4BoxStream = function(arrayBuffer) {
            if (arrayBuffer instanceof ArrayBuffer) {
              this.buffer = arrayBuffer;
              this.dataview = new DataView(arrayBuffer);
            } else {
              throw "Needs an array buffer";
            }
            this.position = 0;
          };
          MP4BoxStream.prototype.getPosition = function() {
            return this.position;
          };
          MP4BoxStream.prototype.getEndPosition = function() {
            return this.buffer.byteLength;
          };
          MP4BoxStream.prototype.getLength = function() {
            return this.buffer.byteLength;
          };
          MP4BoxStream.prototype.seek = function(pos) {
            var npos = Math.max(0, Math.min(this.buffer.byteLength, pos));
            this.position = isNaN(npos) || !isFinite(npos) ? 0 : npos;
            return true;
          };
          MP4BoxStream.prototype.isEos = function() {
            return this.getPosition() >= this.getEndPosition();
          };
          MP4BoxStream.prototype.readAnyInt = function(size, signed) {
            var res = 0;
            if (this.position + size <= this.buffer.byteLength) {
              switch (size) {
                case 1:
                  if (signed) {
                    res = this.dataview.getInt8(this.position);
                  } else {
                    res = this.dataview.getUint8(this.position);
                  }
                  break;
                case 2:
                  if (signed) {
                    res = this.dataview.getInt16(this.position);
                  } else {
                    res = this.dataview.getUint16(this.position);
                  }
                  break;
                case 3:
                  if (signed) {
                    throw "No method for reading signed 24 bits values";
                  } else {
                    res = this.dataview.getUint8(this.position) << 16;
                    res |= this.dataview.getUint8(this.position + 1) << 8;
                    res |= this.dataview.getUint8(this.position + 2);
                  }
                  break;
                case 4:
                  if (signed) {
                    res = this.dataview.getInt32(this.position);
                  } else {
                    res = this.dataview.getUint32(this.position);
                  }
                  break;
                case 8:
                  if (signed) {
                    throw "No method for reading signed 64 bits values";
                  } else {
                    res = this.dataview.getUint32(this.position) << 32;
                    res |= this.dataview.getUint32(this.position + 4);
                  }
                  break;
                default:
                  throw "readInt method not implemented for size: " + size;
              }
              this.position += size;
              return res;
            } else {
              throw "Not enough bytes in buffer";
            }
          };
          MP4BoxStream.prototype.readUint8 = function() {
            return this.readAnyInt(1, false);
          };
          MP4BoxStream.prototype.readUint16 = function() {
            return this.readAnyInt(2, false);
          };
          MP4BoxStream.prototype.readUint24 = function() {
            return this.readAnyInt(3, false);
          };
          MP4BoxStream.prototype.readUint32 = function() {
            return this.readAnyInt(4, false);
          };
          MP4BoxStream.prototype.readUint64 = function() {
            return this.readAnyInt(8, false);
          };
          MP4BoxStream.prototype.readString = function(length) {
            if (this.position + length <= this.buffer.byteLength) {
              var s = "";
              for (var i2 = 0; i2 < length; i2++) {
                s += String.fromCharCode(this.readUint8());
              }
              return s;
            } else {
              throw "Not enough bytes in buffer";
            }
          };
          MP4BoxStream.prototype.readCString = function() {
            var arr = [];
            while (true) {
              var b = this.readUint8();
              if (b !== 0) {
                arr.push(b);
              } else {
                break;
              }
            }
            return String.fromCharCode.apply(null, arr);
          };
          MP4BoxStream.prototype.readInt8 = function() {
            return this.readAnyInt(1, true);
          };
          MP4BoxStream.prototype.readInt16 = function() {
            return this.readAnyInt(2, true);
          };
          MP4BoxStream.prototype.readInt32 = function() {
            return this.readAnyInt(4, true);
          };
          MP4BoxStream.prototype.readInt64 = function() {
            return this.readAnyInt(8, false);
          };
          MP4BoxStream.prototype.readUint8Array = function(length) {
            var arr = new Uint8Array(length);
            for (var i2 = 0; i2 < length; i2++) {
              arr[i2] = this.readUint8();
            }
            return arr;
          };
          MP4BoxStream.prototype.readInt16Array = function(length) {
            var arr = new Int16Array(length);
            for (var i2 = 0; i2 < length; i2++) {
              arr[i2] = this.readInt16();
            }
            return arr;
          };
          MP4BoxStream.prototype.readUint16Array = function(length) {
            var arr = new Int16Array(length);
            for (var i2 = 0; i2 < length; i2++) {
              arr[i2] = this.readUint16();
            }
            return arr;
          };
          MP4BoxStream.prototype.readUint32Array = function(length) {
            var arr = new Uint32Array(length);
            for (var i2 = 0; i2 < length; i2++) {
              arr[i2] = this.readUint32();
            }
            return arr;
          };
          MP4BoxStream.prototype.readInt32Array = function(length) {
            var arr = new Int32Array(length);
            for (var i2 = 0; i2 < length; i2++) {
              arr[i2] = this.readInt32();
            }
            return arr;
          };
          {
            exports.MP4BoxStream = MP4BoxStream;
          }
          var DataStream = function(arrayBuffer, byteOffset, endianness) {
            this._byteOffset = byteOffset || 0;
            if (arrayBuffer instanceof ArrayBuffer) {
              this.buffer = arrayBuffer;
            } else if (typeof arrayBuffer == "object") {
              this.dataView = arrayBuffer;
              if (byteOffset) {
                this._byteOffset += byteOffset;
              }
            } else {
              this.buffer = new ArrayBuffer(arrayBuffer || 0);
            }
            this.position = 0;
            this.endianness = endianness == null ? DataStream.LITTLE_ENDIAN : endianness;
          };
          DataStream.prototype = {};
          DataStream.prototype.getPosition = function() {
            return this.position;
          };
          DataStream.prototype._realloc = function(extra) {
            if (!this._dynamicSize) {
              return;
            }
            var req = this._byteOffset + this.position + extra;
            var blen = this._buffer.byteLength;
            if (req <= blen) {
              if (req > this._byteLength) {
                this._byteLength = req;
              }
              return;
            }
            if (blen < 1) {
              blen = 1;
            }
            while (req > blen) {
              blen *= 2;
            }
            var buf = new ArrayBuffer(blen);
            var src = new Uint8Array(this._buffer);
            var dst = new Uint8Array(buf, 0, src.length);
            dst.set(src);
            this.buffer = buf;
            this._byteLength = req;
          };
          DataStream.prototype._trimAlloc = function() {
            if (this._byteLength == this._buffer.byteLength) {
              return;
            }
            var buf = new ArrayBuffer(this._byteLength);
            var dst = new Uint8Array(buf);
            var src = new Uint8Array(this._buffer, 0, dst.length);
            dst.set(src);
            this.buffer = buf;
          };
          DataStream.BIG_ENDIAN = false;
          DataStream.LITTLE_ENDIAN = true;
          DataStream.prototype._byteLength = 0;
          Object.defineProperty(
            DataStream.prototype,
            "byteLength",
            { get: function() {
              return this._byteLength - this._byteOffset;
            } }
          );
          Object.defineProperty(
            DataStream.prototype,
            "buffer",
            {
              get: function() {
                this._trimAlloc();
                return this._buffer;
              },
              set: function(v) {
                this._buffer = v;
                this._dataView = new DataView(this._buffer, this._byteOffset);
                this._byteLength = this._buffer.byteLength;
              }
            }
          );
          Object.defineProperty(
            DataStream.prototype,
            "byteOffset",
            {
              get: function() {
                return this._byteOffset;
              },
              set: function(v) {
                this._byteOffset = v;
                this._dataView = new DataView(this._buffer, this._byteOffset);
                this._byteLength = this._buffer.byteLength;
              }
            }
          );
          Object.defineProperty(
            DataStream.prototype,
            "dataView",
            {
              get: function() {
                return this._dataView;
              },
              set: function(v) {
                this._byteOffset = v.byteOffset;
                this._buffer = v.buffer;
                this._dataView = new DataView(this._buffer, this._byteOffset);
                this._byteLength = this._byteOffset + v.byteLength;
              }
            }
          );
          DataStream.prototype.seek = function(pos) {
            var npos = Math.max(0, Math.min(this.byteLength, pos));
            this.position = isNaN(npos) || !isFinite(npos) ? 0 : npos;
          };
          DataStream.prototype.isEof = function() {
            return this.position >= this._byteLength;
          };
          DataStream.prototype.mapUint8Array = function(length) {
            this._realloc(length * 1);
            var arr = new Uint8Array(this._buffer, this.byteOffset + this.position, length);
            this.position += length * 1;
            return arr;
          };
          DataStream.prototype.readInt32Array = function(length, e) {
            length = length == null ? this.byteLength - this.position / 4 : length;
            var arr = new Int32Array(length);
            DataStream.memcpy(
              arr.buffer,
              0,
              this.buffer,
              this.byteOffset + this.position,
              length * arr.BYTES_PER_ELEMENT
            );
            DataStream.arrayToNative(arr, e == null ? this.endianness : e);
            this.position += arr.byteLength;
            return arr;
          };
          DataStream.prototype.readInt16Array = function(length, e) {
            length = length == null ? this.byteLength - this.position / 2 : length;
            var arr = new Int16Array(length);
            DataStream.memcpy(
              arr.buffer,
              0,
              this.buffer,
              this.byteOffset + this.position,
              length * arr.BYTES_PER_ELEMENT
            );
            DataStream.arrayToNative(arr, e == null ? this.endianness : e);
            this.position += arr.byteLength;
            return arr;
          };
          DataStream.prototype.readInt8Array = function(length) {
            length = length == null ? this.byteLength - this.position : length;
            var arr = new Int8Array(length);
            DataStream.memcpy(
              arr.buffer,
              0,
              this.buffer,
              this.byteOffset + this.position,
              length * arr.BYTES_PER_ELEMENT
            );
            this.position += arr.byteLength;
            return arr;
          };
          DataStream.prototype.readUint32Array = function(length, e) {
            length = length == null ? this.byteLength - this.position / 4 : length;
            var arr = new Uint32Array(length);
            DataStream.memcpy(
              arr.buffer,
              0,
              this.buffer,
              this.byteOffset + this.position,
              length * arr.BYTES_PER_ELEMENT
            );
            DataStream.arrayToNative(arr, e == null ? this.endianness : e);
            this.position += arr.byteLength;
            return arr;
          };
          DataStream.prototype.readUint16Array = function(length, e) {
            length = length == null ? this.byteLength - this.position / 2 : length;
            var arr = new Uint16Array(length);
            DataStream.memcpy(
              arr.buffer,
              0,
              this.buffer,
              this.byteOffset + this.position,
              length * arr.BYTES_PER_ELEMENT
            );
            DataStream.arrayToNative(arr, e == null ? this.endianness : e);
            this.position += arr.byteLength;
            return arr;
          };
          DataStream.prototype.readUint8Array = function(length) {
            length = length == null ? this.byteLength - this.position : length;
            var arr = new Uint8Array(length);
            DataStream.memcpy(
              arr.buffer,
              0,
              this.buffer,
              this.byteOffset + this.position,
              length * arr.BYTES_PER_ELEMENT
            );
            this.position += arr.byteLength;
            return arr;
          };
          DataStream.prototype.readFloat64Array = function(length, e) {
            length = length == null ? this.byteLength - this.position / 8 : length;
            var arr = new Float64Array(length);
            DataStream.memcpy(
              arr.buffer,
              0,
              this.buffer,
              this.byteOffset + this.position,
              length * arr.BYTES_PER_ELEMENT
            );
            DataStream.arrayToNative(arr, e == null ? this.endianness : e);
            this.position += arr.byteLength;
            return arr;
          };
          DataStream.prototype.readFloat32Array = function(length, e) {
            length = length == null ? this.byteLength - this.position / 4 : length;
            var arr = new Float32Array(length);
            DataStream.memcpy(
              arr.buffer,
              0,
              this.buffer,
              this.byteOffset + this.position,
              length * arr.BYTES_PER_ELEMENT
            );
            DataStream.arrayToNative(arr, e == null ? this.endianness : e);
            this.position += arr.byteLength;
            return arr;
          };
          DataStream.prototype.readInt32 = function(e) {
            var v = this._dataView.getInt32(this.position, e == null ? this.endianness : e);
            this.position += 4;
            return v;
          };
          DataStream.prototype.readInt16 = function(e) {
            var v = this._dataView.getInt16(this.position, e == null ? this.endianness : e);
            this.position += 2;
            return v;
          };
          DataStream.prototype.readInt8 = function() {
            var v = this._dataView.getInt8(this.position);
            this.position += 1;
            return v;
          };
          DataStream.prototype.readUint32 = function(e) {
            var v = this._dataView.getUint32(this.position, e == null ? this.endianness : e);
            this.position += 4;
            return v;
          };
          DataStream.prototype.readUint16 = function(e) {
            var v = this._dataView.getUint16(this.position, e == null ? this.endianness : e);
            this.position += 2;
            return v;
          };
          DataStream.prototype.readUint8 = function() {
            var v = this._dataView.getUint8(this.position);
            this.position += 1;
            return v;
          };
          DataStream.prototype.readFloat32 = function(e) {
            var v = this._dataView.getFloat32(this.position, e == null ? this.endianness : e);
            this.position += 4;
            return v;
          };
          DataStream.prototype.readFloat64 = function(e) {
            var v = this._dataView.getFloat64(this.position, e == null ? this.endianness : e);
            this.position += 8;
            return v;
          };
          DataStream.endianness = new Int8Array(new Int16Array([1]).buffer)[0] > 0;
          DataStream.memcpy = function(dst, dstOffset, src, srcOffset, byteLength) {
            var dstU8 = new Uint8Array(dst, dstOffset, byteLength);
            var srcU8 = new Uint8Array(src, srcOffset, byteLength);
            dstU8.set(srcU8);
          };
          DataStream.arrayToNative = function(array, arrayIsLittleEndian) {
            if (arrayIsLittleEndian == this.endianness) {
              return array;
            } else {
              return this.flipArrayEndianness(array);
            }
          };
          DataStream.nativeToEndian = function(array, littleEndian) {
            if (this.endianness == littleEndian) {
              return array;
            } else {
              return this.flipArrayEndianness(array);
            }
          };
          DataStream.flipArrayEndianness = function(array) {
            var u8 = new Uint8Array(array.buffer, array.byteOffset, array.byteLength);
            for (var i2 = 0; i2 < array.byteLength; i2 += array.BYTES_PER_ELEMENT) {
              for (var j = i2 + array.BYTES_PER_ELEMENT - 1, k = i2; j > k; j--, k++) {
                var tmp = u8[k];
                u8[k] = u8[j];
                u8[j] = tmp;
              }
            }
            return array;
          };
          DataStream.prototype.failurePosition = 0;
          String.fromCharCodeUint8 = function(uint8arr) {
            var arr = [];
            for (var i2 = 0; i2 < uint8arr.length; i2++) {
              arr[i2] = uint8arr[i2];
            }
            return String.fromCharCode.apply(null, arr);
          };
          DataStream.prototype.readString = function(length, encoding) {
            if (encoding == null || encoding == "ASCII") {
              return String.fromCharCodeUint8.apply(null, [this.mapUint8Array(length == null ? this.byteLength - this.position : length)]);
            } else {
              return new TextDecoder(encoding).decode(this.mapUint8Array(length));
            }
          };
          DataStream.prototype.readCString = function(length) {
            var blen = this.byteLength - this.position;
            var u8 = new Uint8Array(this._buffer, this._byteOffset + this.position);
            var len = blen;
            if (length != null) {
              len = Math.min(length, blen);
            }
            for (var i2 = 0; i2 < len && u8[i2] !== 0; i2++) ;
            var s = String.fromCharCodeUint8.apply(null, [this.mapUint8Array(i2)]);
            if (length != null) {
              this.position += len - i2;
            } else if (i2 != blen) {
              this.position += 1;
            }
            return s;
          };
          var MAX_SIZE = Math.pow(2, 32);
          DataStream.prototype.readInt64 = function() {
            return this.readInt32() * MAX_SIZE + this.readUint32();
          };
          DataStream.prototype.readUint64 = function() {
            return this.readUint32() * MAX_SIZE + this.readUint32();
          };
          DataStream.prototype.readInt64 = function() {
            return this.readUint32() * MAX_SIZE + this.readUint32();
          };
          DataStream.prototype.readUint24 = function() {
            return (this.readUint8() << 16) + (this.readUint8() << 8) + this.readUint8();
          };
          {
            exports.DataStream = DataStream;
          }
          DataStream.prototype.save = function(filename) {
            var blob = new Blob([this.buffer]);
            if (window.URL && URL.createObjectURL) {
              var url = window.URL.createObjectURL(blob);
              var a = document.createElement("a");
              document.body.appendChild(a);
              a.setAttribute("href", url);
              a.setAttribute("download", filename);
              a.setAttribute("target", "_self");
              a.click();
              window.URL.revokeObjectURL(url);
            } else {
              throw "DataStream.save: Can't create object URL.";
            }
          };
          DataStream.prototype._dynamicSize = true;
          Object.defineProperty(
            DataStream.prototype,
            "dynamicSize",
            {
              get: function() {
                return this._dynamicSize;
              },
              set: function(v) {
                if (!v) {
                  this._trimAlloc();
                }
                this._dynamicSize = v;
              }
            }
          );
          DataStream.prototype.shift = function(offset) {
            var buf = new ArrayBuffer(this._byteLength - offset);
            var dst = new Uint8Array(buf);
            var src = new Uint8Array(this._buffer, offset, dst.length);
            dst.set(src);
            this.buffer = buf;
            this.position -= offset;
          };
          DataStream.prototype.writeInt32Array = function(arr, e) {
            this._realloc(arr.length * 4);
            if (arr instanceof Int32Array && this.byteOffset + this.position % arr.BYTES_PER_ELEMENT === 0) {
              DataStream.memcpy(
                this._buffer,
                this.byteOffset + this.position,
                arr.buffer,
                0,
                arr.byteLength
              );
              this.mapInt32Array(arr.length, e);
            } else {
              for (var i2 = 0; i2 < arr.length; i2++) {
                this.writeInt32(arr[i2], e);
              }
            }
          };
          DataStream.prototype.writeInt16Array = function(arr, e) {
            this._realloc(arr.length * 2);
            if (arr instanceof Int16Array && this.byteOffset + this.position % arr.BYTES_PER_ELEMENT === 0) {
              DataStream.memcpy(
                this._buffer,
                this.byteOffset + this.position,
                arr.buffer,
                0,
                arr.byteLength
              );
              this.mapInt16Array(arr.length, e);
            } else {
              for (var i2 = 0; i2 < arr.length; i2++) {
                this.writeInt16(arr[i2], e);
              }
            }
          };
          DataStream.prototype.writeInt8Array = function(arr) {
            this._realloc(arr.length * 1);
            if (arr instanceof Int8Array && this.byteOffset + this.position % arr.BYTES_PER_ELEMENT === 0) {
              DataStream.memcpy(
                this._buffer,
                this.byteOffset + this.position,
                arr.buffer,
                0,
                arr.byteLength
              );
              this.mapInt8Array(arr.length);
            } else {
              for (var i2 = 0; i2 < arr.length; i2++) {
                this.writeInt8(arr[i2]);
              }
            }
          };
          DataStream.prototype.writeUint32Array = function(arr, e) {
            this._realloc(arr.length * 4);
            if (arr instanceof Uint32Array && this.byteOffset + this.position % arr.BYTES_PER_ELEMENT === 0) {
              DataStream.memcpy(
                this._buffer,
                this.byteOffset + this.position,
                arr.buffer,
                0,
                arr.byteLength
              );
              this.mapUint32Array(arr.length, e);
            } else {
              for (var i2 = 0; i2 < arr.length; i2++) {
                this.writeUint32(arr[i2], e);
              }
            }
          };
          DataStream.prototype.writeUint16Array = function(arr, e) {
            this._realloc(arr.length * 2);
            if (arr instanceof Uint16Array && this.byteOffset + this.position % arr.BYTES_PER_ELEMENT === 0) {
              DataStream.memcpy(
                this._buffer,
                this.byteOffset + this.position,
                arr.buffer,
                0,
                arr.byteLength
              );
              this.mapUint16Array(arr.length, e);
            } else {
              for (var i2 = 0; i2 < arr.length; i2++) {
                this.writeUint16(arr[i2], e);
              }
            }
          };
          DataStream.prototype.writeUint8Array = function(arr) {
            this._realloc(arr.length * 1);
            if (arr instanceof Uint8Array && this.byteOffset + this.position % arr.BYTES_PER_ELEMENT === 0) {
              DataStream.memcpy(
                this._buffer,
                this.byteOffset + this.position,
                arr.buffer,
                0,
                arr.byteLength
              );
              this.mapUint8Array(arr.length);
            } else {
              for (var i2 = 0; i2 < arr.length; i2++) {
                this.writeUint8(arr[i2]);
              }
            }
          };
          DataStream.prototype.writeFloat64Array = function(arr, e) {
            this._realloc(arr.length * 8);
            if (arr instanceof Float64Array && this.byteOffset + this.position % arr.BYTES_PER_ELEMENT === 0) {
              DataStream.memcpy(
                this._buffer,
                this.byteOffset + this.position,
                arr.buffer,
                0,
                arr.byteLength
              );
              this.mapFloat64Array(arr.length, e);
            } else {
              for (var i2 = 0; i2 < arr.length; i2++) {
                this.writeFloat64(arr[i2], e);
              }
            }
          };
          DataStream.prototype.writeFloat32Array = function(arr, e) {
            this._realloc(arr.length * 4);
            if (arr instanceof Float32Array && this.byteOffset + this.position % arr.BYTES_PER_ELEMENT === 0) {
              DataStream.memcpy(
                this._buffer,
                this.byteOffset + this.position,
                arr.buffer,
                0,
                arr.byteLength
              );
              this.mapFloat32Array(arr.length, e);
            } else {
              for (var i2 = 0; i2 < arr.length; i2++) {
                this.writeFloat32(arr[i2], e);
              }
            }
          };
          DataStream.prototype.writeInt32 = function(v, e) {
            this._realloc(4);
            this._dataView.setInt32(this.position, v, e == null ? this.endianness : e);
            this.position += 4;
          };
          DataStream.prototype.writeInt16 = function(v, e) {
            this._realloc(2);
            this._dataView.setInt16(this.position, v, e == null ? this.endianness : e);
            this.position += 2;
          };
          DataStream.prototype.writeInt8 = function(v) {
            this._realloc(1);
            this._dataView.setInt8(this.position, v);
            this.position += 1;
          };
          DataStream.prototype.writeUint32 = function(v, e) {
            this._realloc(4);
            this._dataView.setUint32(this.position, v, e == null ? this.endianness : e);
            this.position += 4;
          };
          DataStream.prototype.writeUint16 = function(v, e) {
            this._realloc(2);
            this._dataView.setUint16(this.position, v, e == null ? this.endianness : e);
            this.position += 2;
          };
          DataStream.prototype.writeUint8 = function(v) {
            this._realloc(1);
            this._dataView.setUint8(this.position, v);
            this.position += 1;
          };
          DataStream.prototype.writeFloat32 = function(v, e) {
            this._realloc(4);
            this._dataView.setFloat32(this.position, v, e == null ? this.endianness : e);
            this.position += 4;
          };
          DataStream.prototype.writeFloat64 = function(v, e) {
            this._realloc(8);
            this._dataView.setFloat64(this.position, v, e == null ? this.endianness : e);
            this.position += 8;
          };
          DataStream.prototype.writeUCS2String = function(str, endianness, lengthOverride) {
            if (lengthOverride == null) {
              lengthOverride = str.length;
            }
            for (var i2 = 0; i2 < str.length && i2 < lengthOverride; i2++) {
              this.writeUint16(str.charCodeAt(i2), endianness);
            }
            for (; i2 < lengthOverride; i2++) {
              this.writeUint16(0);
            }
          };
          DataStream.prototype.writeString = function(s, encoding, length) {
            var i2 = 0;
            if (encoding == null || encoding == "ASCII") {
              if (length != null) {
                var len = Math.min(s.length, length);
                for (i2 = 0; i2 < len; i2++) {
                  this.writeUint8(s.charCodeAt(i2));
                }
                for (; i2 < length; i2++) {
                  this.writeUint8(0);
                }
              } else {
                for (i2 = 0; i2 < s.length; i2++) {
                  this.writeUint8(s.charCodeAt(i2));
                }
              }
            } else {
              this.writeUint8Array(new TextEncoder(encoding).encode(s.substring(0, length)));
            }
          };
          DataStream.prototype.writeCString = function(s, length) {
            var i2 = 0;
            if (length != null) {
              var len = Math.min(s.length, length);
              for (i2 = 0; i2 < len; i2++) {
                this.writeUint8(s.charCodeAt(i2));
              }
              for (; i2 < length; i2++) {
                this.writeUint8(0);
              }
            } else {
              for (i2 = 0; i2 < s.length; i2++) {
                this.writeUint8(s.charCodeAt(i2));
              }
              this.writeUint8(0);
            }
          };
          DataStream.prototype.writeStruct = function(structDefinition, struct) {
            for (var i2 = 0; i2 < structDefinition.length; i2 += 2) {
              var t = structDefinition[i2 + 1];
              this.writeType(t, struct[structDefinition[i2]], struct);
            }
          };
          DataStream.prototype.writeType = function(t, v, struct) {
            var tp;
            if (typeof t == "function") {
              return t(this, v);
            } else if (typeof t == "object" && !(t instanceof Array)) {
              return t.set(this, v, struct);
            }
            var lengthOverride = null;
            var charset = "ASCII";
            var pos = this.position;
            if (typeof t == "string" && /:/.test(t)) {
              tp = t.split(":");
              t = tp[0];
              lengthOverride = parseInt(tp[1]);
            }
            if (typeof t == "string" && /,/.test(t)) {
              tp = t.split(",");
              t = tp[0];
              charset = parseInt(tp[1]);
            }
            switch (t) {
              case "uint8":
                this.writeUint8(v);
                break;
              case "int8":
                this.writeInt8(v);
                break;
              case "uint16":
                this.writeUint16(v, this.endianness);
                break;
              case "int16":
                this.writeInt16(v, this.endianness);
                break;
              case "uint32":
                this.writeUint32(v, this.endianness);
                break;
              case "int32":
                this.writeInt32(v, this.endianness);
                break;
              case "float32":
                this.writeFloat32(v, this.endianness);
                break;
              case "float64":
                this.writeFloat64(v, this.endianness);
                break;
              case "uint16be":
                this.writeUint16(v, DataStream.BIG_ENDIAN);
                break;
              case "int16be":
                this.writeInt16(v, DataStream.BIG_ENDIAN);
                break;
              case "uint32be":
                this.writeUint32(v, DataStream.BIG_ENDIAN);
                break;
              case "int32be":
                this.writeInt32(v, DataStream.BIG_ENDIAN);
                break;
              case "float32be":
                this.writeFloat32(v, DataStream.BIG_ENDIAN);
                break;
              case "float64be":
                this.writeFloat64(v, DataStream.BIG_ENDIAN);
                break;
              case "uint16le":
                this.writeUint16(v, DataStream.LITTLE_ENDIAN);
                break;
              case "int16le":
                this.writeInt16(v, DataStream.LITTLE_ENDIAN);
                break;
              case "uint32le":
                this.writeUint32(v, DataStream.LITTLE_ENDIAN);
                break;
              case "int32le":
                this.writeInt32(v, DataStream.LITTLE_ENDIAN);
                break;
              case "float32le":
                this.writeFloat32(v, DataStream.LITTLE_ENDIAN);
                break;
              case "float64le":
                this.writeFloat64(v, DataStream.LITTLE_ENDIAN);
                break;
              case "cstring":
                this.writeCString(v, lengthOverride);
                break;
              case "string":
                this.writeString(v, charset, lengthOverride);
                break;
              case "u16string":
                this.writeUCS2String(v, this.endianness, lengthOverride);
                break;
              case "u16stringle":
                this.writeUCS2String(v, DataStream.LITTLE_ENDIAN, lengthOverride);
                break;
              case "u16stringbe":
                this.writeUCS2String(v, DataStream.BIG_ENDIAN, lengthOverride);
                break;
              default:
                if (t.length == 3) {
                  var ta = t[1];
                  for (var i2 = 0; i2 < v.length; i2++) {
                    this.writeType(ta, v[i2]);
                  }
                  break;
                } else {
                  this.writeStruct(t, v);
                  break;
                }
            }
            if (lengthOverride != null) {
              this.position = pos;
              this._realloc(lengthOverride);
              this.position = pos + lengthOverride;
            }
          };
          DataStream.prototype.writeUint64 = function(v) {
            var h2 = Math.floor(v / MAX_SIZE);
            this.writeUint32(h2);
            this.writeUint32(v & 4294967295);
          };
          DataStream.prototype.writeUint24 = function(v) {
            this.writeUint8((v & 16711680) >> 16);
            this.writeUint8((v & 65280) >> 8);
            this.writeUint8(v & 255);
          };
          DataStream.prototype.adjustUint32 = function(position, value) {
            var pos = this.position;
            this.seek(position);
            this.writeUint32(value);
            this.seek(pos);
          };
          DataStream.prototype.mapInt32Array = function(length, e) {
            this._realloc(length * 4);
            var arr = new Int32Array(this._buffer, this.byteOffset + this.position, length);
            DataStream.arrayToNative(arr, e == null ? this.endianness : e);
            this.position += length * 4;
            return arr;
          };
          DataStream.prototype.mapInt16Array = function(length, e) {
            this._realloc(length * 2);
            var arr = new Int16Array(this._buffer, this.byteOffset + this.position, length);
            DataStream.arrayToNative(arr, e == null ? this.endianness : e);
            this.position += length * 2;
            return arr;
          };
          DataStream.prototype.mapInt8Array = function(length) {
            this._realloc(length * 1);
            var arr = new Int8Array(this._buffer, this.byteOffset + this.position, length);
            this.position += length * 1;
            return arr;
          };
          DataStream.prototype.mapUint32Array = function(length, e) {
            this._realloc(length * 4);
            var arr = new Uint32Array(this._buffer, this.byteOffset + this.position, length);
            DataStream.arrayToNative(arr, e == null ? this.endianness : e);
            this.position += length * 4;
            return arr;
          };
          DataStream.prototype.mapUint16Array = function(length, e) {
            this._realloc(length * 2);
            var arr = new Uint16Array(this._buffer, this.byteOffset + this.position, length);
            DataStream.arrayToNative(arr, e == null ? this.endianness : e);
            this.position += length * 2;
            return arr;
          };
          DataStream.prototype.mapFloat64Array = function(length, e) {
            this._realloc(length * 8);
            var arr = new Float64Array(this._buffer, this.byteOffset + this.position, length);
            DataStream.arrayToNative(arr, e == null ? this.endianness : e);
            this.position += length * 8;
            return arr;
          };
          DataStream.prototype.mapFloat32Array = function(length, e) {
            this._realloc(length * 4);
            var arr = new Float32Array(this._buffer, this.byteOffset + this.position, length);
            DataStream.arrayToNative(arr, e == null ? this.endianness : e);
            this.position += length * 4;
            return arr;
          };
          var MultiBufferStream = function(buffer) {
            this.buffers = [];
            this.bufferIndex = -1;
            if (buffer) {
              this.insertBuffer(buffer);
              this.bufferIndex = 0;
            }
          };
          MultiBufferStream.prototype = new DataStream(new ArrayBuffer(), 0, DataStream.BIG_ENDIAN);
          MultiBufferStream.prototype.initialized = function() {
            var firstBuffer;
            if (this.bufferIndex > -1) {
              return true;
            } else if (this.buffers.length > 0) {
              firstBuffer = this.buffers[0];
              if (firstBuffer.fileStart === 0) {
                this.buffer = firstBuffer;
                this.bufferIndex = 0;
                Log.debug("MultiBufferStream", "Stream ready for parsing");
                return true;
              } else {
                Log.warn("MultiBufferStream", "The first buffer should have a fileStart of 0");
                this.logBufferLevel();
                return false;
              }
            } else {
              Log.warn("MultiBufferStream", "No buffer to start parsing from");
              this.logBufferLevel();
              return false;
            }
          };
          ArrayBuffer.concat = function(buffer1, buffer2) {
            Log.debug("ArrayBuffer", "Trying to create a new buffer of size: " + (buffer1.byteLength + buffer2.byteLength));
            var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
            tmp.set(new Uint8Array(buffer1), 0);
            tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
            return tmp.buffer;
          };
          MultiBufferStream.prototype.reduceBuffer = function(buffer, offset, newLength) {
            var smallB;
            smallB = new Uint8Array(newLength);
            smallB.set(new Uint8Array(buffer, offset, newLength));
            smallB.buffer.fileStart = buffer.fileStart + offset;
            smallB.buffer.usedBytes = 0;
            return smallB.buffer;
          };
          MultiBufferStream.prototype.insertBuffer = function(ab) {
            var to_add = true;
            for (var i2 = 0; i2 < this.buffers.length; i2++) {
              var b = this.buffers[i2];
              if (ab.fileStart <= b.fileStart) {
                if (ab.fileStart === b.fileStart) {
                  if (ab.byteLength > b.byteLength) {
                    this.buffers.splice(i2, 1);
                    i2--;
                    continue;
                  } else {
                    Log.warn("MultiBufferStream", "Buffer (fileStart: " + ab.fileStart + " - Length: " + ab.byteLength + ") already appended, ignoring");
                  }
                } else {
                  if (ab.fileStart + ab.byteLength <= b.fileStart) ;
                  else {
                    ab = this.reduceBuffer(ab, 0, b.fileStart - ab.fileStart);
                  }
                  Log.debug("MultiBufferStream", "Appending new buffer (fileStart: " + ab.fileStart + " - Length: " + ab.byteLength + ")");
                  this.buffers.splice(i2, 0, ab);
                  if (i2 === 0) {
                    this.buffer = ab;
                  }
                }
                to_add = false;
                break;
              } else if (ab.fileStart < b.fileStart + b.byteLength) {
                var offset = b.fileStart + b.byteLength - ab.fileStart;
                var newLength = ab.byteLength - offset;
                if (newLength > 0) {
                  ab = this.reduceBuffer(ab, offset, newLength);
                } else {
                  to_add = false;
                  break;
                }
              }
            }
            if (to_add) {
              Log.debug("MultiBufferStream", "Appending new buffer (fileStart: " + ab.fileStart + " - Length: " + ab.byteLength + ")");
              this.buffers.push(ab);
              if (i2 === 0) {
                this.buffer = ab;
              }
            }
          };
          MultiBufferStream.prototype.logBufferLevel = function(info) {
            var i2;
            var buffer;
            var used, total;
            var ranges = [];
            var range;
            var bufferedString = "";
            used = 0;
            total = 0;
            for (i2 = 0; i2 < this.buffers.length; i2++) {
              buffer = this.buffers[i2];
              if (i2 === 0) {
                range = {};
                ranges.push(range);
                range.start = buffer.fileStart;
                range.end = buffer.fileStart + buffer.byteLength;
                bufferedString += "[" + range.start + "-";
              } else if (range.end === buffer.fileStart) {
                range.end = buffer.fileStart + buffer.byteLength;
              } else {
                range = {};
                range.start = buffer.fileStart;
                bufferedString += ranges[ranges.length - 1].end - 1 + "], [" + range.start + "-";
                range.end = buffer.fileStart + buffer.byteLength;
                ranges.push(range);
              }
              used += buffer.usedBytes;
              total += buffer.byteLength;
            }
            if (ranges.length > 0) {
              bufferedString += range.end - 1 + "]";
            }
            var log = info ? Log.info : Log.debug;
            if (this.buffers.length === 0) {
              log("MultiBufferStream", "No more buffer in memory");
            } else {
              log("MultiBufferStream", "" + this.buffers.length + " stored buffer(s) (" + used + "/" + total + " bytes), continuous ranges: " + bufferedString);
            }
          };
          MultiBufferStream.prototype.cleanBuffers = function() {
            var i2;
            var buffer;
            for (i2 = 0; i2 < this.buffers.length; i2++) {
              buffer = this.buffers[i2];
              if (buffer.usedBytes === buffer.byteLength) {
                Log.debug("MultiBufferStream", "Removing buffer #" + i2);
                this.buffers.splice(i2, 1);
                i2--;
              }
            }
          };
          MultiBufferStream.prototype.mergeNextBuffer = function() {
            var next_buffer;
            if (this.bufferIndex + 1 < this.buffers.length) {
              next_buffer = this.buffers[this.bufferIndex + 1];
              if (next_buffer.fileStart === this.buffer.fileStart + this.buffer.byteLength) {
                var oldLength = this.buffer.byteLength;
                var oldUsedBytes = this.buffer.usedBytes;
                var oldFileStart = this.buffer.fileStart;
                this.buffers[this.bufferIndex] = ArrayBuffer.concat(this.buffer, next_buffer);
                this.buffer = this.buffers[this.bufferIndex];
                this.buffers.splice(this.bufferIndex + 1, 1);
                this.buffer.usedBytes = oldUsedBytes;
                this.buffer.fileStart = oldFileStart;
                Log.debug("ISOFile", "Concatenating buffer for box parsing (length: " + oldLength + "->" + this.buffer.byteLength + ")");
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          };
          MultiBufferStream.prototype.findPosition = function(fromStart, filePosition, markAsUsed) {
            var i2;
            var abuffer = null;
            var index = -1;
            if (fromStart === true) {
              i2 = 0;
            } else {
              i2 = this.bufferIndex;
            }
            while (i2 < this.buffers.length) {
              abuffer = this.buffers[i2];
              if (abuffer.fileStart <= filePosition) {
                index = i2;
                if (markAsUsed) {
                  if (abuffer.fileStart + abuffer.byteLength <= filePosition) {
                    abuffer.usedBytes = abuffer.byteLength;
                  } else {
                    abuffer.usedBytes = filePosition - abuffer.fileStart;
                  }
                  this.logBufferLevel();
                }
              } else {
                break;
              }
              i2++;
            }
            if (index !== -1) {
              abuffer = this.buffers[index];
              if (abuffer.fileStart + abuffer.byteLength >= filePosition) {
                Log.debug("MultiBufferStream", "Found position in existing buffer #" + index);
                return index;
              } else {
                return -1;
              }
            } else {
              return -1;
            }
          };
          MultiBufferStream.prototype.findEndContiguousBuf = function(inputindex) {
            var i2;
            var currentBuf;
            var nextBuf;
            var index = inputindex !== undefined ? inputindex : this.bufferIndex;
            currentBuf = this.buffers[index];
            if (this.buffers.length > index + 1) {
              for (i2 = index + 1; i2 < this.buffers.length; i2++) {
                nextBuf = this.buffers[i2];
                if (nextBuf.fileStart === currentBuf.fileStart + currentBuf.byteLength) {
                  currentBuf = nextBuf;
                } else {
                  break;
                }
              }
            }
            return currentBuf.fileStart + currentBuf.byteLength;
          };
          MultiBufferStream.prototype.getEndFilePositionAfter = function(pos) {
            var index = this.findPosition(true, pos, false);
            if (index !== -1) {
              return this.findEndContiguousBuf(index);
            } else {
              return pos;
            }
          };
          MultiBufferStream.prototype.addUsedBytes = function(nbBytes) {
            this.buffer.usedBytes += nbBytes;
            this.logBufferLevel();
          };
          MultiBufferStream.prototype.setAllUsedBytes = function() {
            this.buffer.usedBytes = this.buffer.byteLength;
            this.logBufferLevel();
          };
          MultiBufferStream.prototype.seek = function(filePosition, fromStart, markAsUsed) {
            var index;
            index = this.findPosition(fromStart, filePosition, markAsUsed);
            if (index !== -1) {
              this.buffer = this.buffers[index];
              this.bufferIndex = index;
              this.position = filePosition - this.buffer.fileStart;
              Log.debug("MultiBufferStream", "Repositioning parser at buffer position: " + this.position);
              return true;
            } else {
              Log.debug("MultiBufferStream", "Position " + filePosition + " not found in buffered data");
              return false;
            }
          };
          MultiBufferStream.prototype.getPosition = function() {
            if (this.bufferIndex === -1 || this.buffers[this.bufferIndex] === null) {
              throw "Error accessing position in the MultiBufferStream";
            }
            return this.buffers[this.bufferIndex].fileStart + this.position;
          };
          MultiBufferStream.prototype.getLength = function() {
            return this.byteLength;
          };
          MultiBufferStream.prototype.getEndPosition = function() {
            if (this.bufferIndex === -1 || this.buffers[this.bufferIndex] === null) {
              throw "Error accessing position in the MultiBufferStream";
            }
            return this.buffers[this.bufferIndex].fileStart + this.byteLength;
          };
          {
            exports.MultiBufferStream = MultiBufferStream;
          }
          var MPEG4DescriptorParser = function() {
            var ES_DescrTag = 3;
            var DecoderConfigDescrTag = 4;
            var DecSpecificInfoTag = 5;
            var SLConfigDescrTag = 6;
            var descTagToName = [];
            descTagToName[ES_DescrTag] = "ES_Descriptor";
            descTagToName[DecoderConfigDescrTag] = "DecoderConfigDescriptor";
            descTagToName[DecSpecificInfoTag] = "DecoderSpecificInfo";
            descTagToName[SLConfigDescrTag] = "SLConfigDescriptor";
            this.getDescriptorName = function(tag) {
              return descTagToName[tag];
            };
            var that = this;
            var classes = {};
            this.parseOneDescriptor = function(stream) {
              var size = 0;
              var tag;
              var desc;
              var byteRead;
              tag = stream.readUint8();
              byteRead = stream.readUint8();
              while (byteRead & 128) {
                size = (size << 7) + (byteRead & 127);
                byteRead = stream.readUint8();
              }
              size = (size << 7) + (byteRead & 127);
              Log.debug("MPEG4DescriptorParser", "Found " + (descTagToName[tag] || "Descriptor " + tag) + ", size " + size + " at position " + stream.getPosition());
              if (descTagToName[tag]) {
                desc = new classes[descTagToName[tag]](size);
              } else {
                desc = new classes.Descriptor(size);
              }
              desc.parse(stream);
              return desc;
            };
            classes.Descriptor = function(_tag, _size) {
              this.tag = _tag;
              this.size = _size;
              this.descs = [];
            };
            classes.Descriptor.prototype.parse = function(stream) {
              this.data = stream.readUint8Array(this.size);
            };
            classes.Descriptor.prototype.findDescriptor = function(tag) {
              for (var i2 = 0; i2 < this.descs.length; i2++) {
                if (this.descs[i2].tag == tag) {
                  return this.descs[i2];
                }
              }
              return null;
            };
            classes.Descriptor.prototype.parseRemainingDescriptors = function(stream) {
              var start = stream.position;
              while (stream.position < start + this.size) {
                var desc = that.parseOneDescriptor(stream);
                this.descs.push(desc);
              }
            };
            classes.ES_Descriptor = function(size) {
              classes.Descriptor.call(this, ES_DescrTag, size);
            };
            classes.ES_Descriptor.prototype = new classes.Descriptor();
            classes.ES_Descriptor.prototype.parse = function(stream) {
              this.ES_ID = stream.readUint16();
              this.flags = stream.readUint8();
              this.size -= 3;
              if (this.flags & 128) {
                this.dependsOn_ES_ID = stream.readUint16();
                this.size -= 2;
              } else {
                this.dependsOn_ES_ID = 0;
              }
              if (this.flags & 64) {
                var l = stream.readUint8();
                this.URL = stream.readString(l);
                this.size -= l + 1;
              } else {
                this.URL = "";
              }
              if (this.flags & 32) {
                this.OCR_ES_ID = stream.readUint16();
                this.size -= 2;
              } else {
                this.OCR_ES_ID = 0;
              }
              this.parseRemainingDescriptors(stream);
            };
            classes.ES_Descriptor.prototype.getOTI = function(stream) {
              var dcd = this.findDescriptor(DecoderConfigDescrTag);
              if (dcd) {
                return dcd.oti;
              } else {
                return 0;
              }
            };
            classes.ES_Descriptor.prototype.getAudioConfig = function(stream) {
              var dcd = this.findDescriptor(DecoderConfigDescrTag);
              if (!dcd) return null;
              var dsi = dcd.findDescriptor(DecSpecificInfoTag);
              if (dsi && dsi.data) {
                var audioObjectType = (dsi.data[0] & 248) >> 3;
                if (audioObjectType === 31 && dsi.data.length >= 2) {
                  audioObjectType = 32 + ((dsi.data[0] & 7) << 3) + ((dsi.data[1] & 224) >> 5);
                }
                return audioObjectType;
              } else {
                return null;
              }
            };
            classes.DecoderConfigDescriptor = function(size) {
              classes.Descriptor.call(this, DecoderConfigDescrTag, size);
            };
            classes.DecoderConfigDescriptor.prototype = new classes.Descriptor();
            classes.DecoderConfigDescriptor.prototype.parse = function(stream) {
              this.oti = stream.readUint8();
              this.streamType = stream.readUint8();
              this.upStream = (this.streamType >> 1 & 1) !== 0;
              this.streamType = this.streamType >>> 2;
              this.bufferSize = stream.readUint24();
              this.maxBitrate = stream.readUint32();
              this.avgBitrate = stream.readUint32();
              this.size -= 13;
              this.parseRemainingDescriptors(stream);
            };
            classes.DecoderSpecificInfo = function(size) {
              classes.Descriptor.call(this, DecSpecificInfoTag, size);
            };
            classes.DecoderSpecificInfo.prototype = new classes.Descriptor();
            classes.SLConfigDescriptor = function(size) {
              classes.Descriptor.call(this, SLConfigDescrTag, size);
            };
            classes.SLConfigDescriptor.prototype = new classes.Descriptor();
            return this;
          };
          {
            exports.MPEG4DescriptorParser = MPEG4DescriptorParser;
          }
          var BoxParser = {
            ERR_INVALID_DATA: -1,
            ERR_NOT_ENOUGH_DATA: 0,
            OK: 1,
            // Boxes to be created with default parsing
            BASIC_BOXES: ["mdat", "idat", "free", "skip", "meco", "strk"],
            FULL_BOXES: ["hmhd", "nmhd", "iods", "xml ", "bxml", "ipro", "mere"],
            CONTAINER_BOXES: [
              ["moov", ["trak", "pssh"]],
              ["trak"],
              ["edts"],
              ["mdia"],
              ["minf"],
              ["dinf"],
              ["stbl", ["sgpd", "sbgp"]],
              ["mvex", ["trex"]],
              ["moof", ["traf"]],
              ["traf", ["trun", "sgpd", "sbgp"]],
              ["vttc"],
              ["tref"],
              ["iref"],
              ["mfra", ["tfra"]],
              ["meco"],
              ["hnti"],
              ["hinf"],
              ["strk"],
              ["strd"],
              ["sinf"],
              ["rinf"],
              ["schi"],
              ["trgr"],
              ["udta", ["kind"]],
              ["iprp", ["ipma"]],
              ["ipco"],
              ["grpl"],
              ["j2kH"],
              ["etyp", ["tyco"]]
            ],
            // Boxes effectively created
            boxCodes: [],
            fullBoxCodes: [],
            containerBoxCodes: [],
            sampleEntryCodes: {},
            sampleGroupEntryCodes: [],
            trackGroupTypes: [],
            UUIDBoxes: {},
            UUIDs: [],
            initialize: function() {
              BoxParser.FullBox.prototype = new BoxParser.Box();
              BoxParser.ContainerBox.prototype = new BoxParser.Box();
              BoxParser.SampleEntry.prototype = new BoxParser.Box();
              BoxParser.TrackGroupTypeBox.prototype = new BoxParser.FullBox();
              BoxParser.BASIC_BOXES.forEach(function(type) {
                BoxParser.createBoxCtor(type);
              });
              BoxParser.FULL_BOXES.forEach(function(type) {
                BoxParser.createFullBoxCtor(type);
              });
              BoxParser.CONTAINER_BOXES.forEach(function(types) {
                BoxParser.createContainerBoxCtor(types[0], null, types[1]);
              });
            },
            Box: function(_type, _size, _uuid) {
              this.type = _type;
              this.size = _size;
              this.uuid = _uuid;
            },
            FullBox: function(type, size, uuid) {
              BoxParser.Box.call(this, type, size, uuid);
              this.flags = 0;
              this.version = 0;
            },
            ContainerBox: function(type, size, uuid) {
              BoxParser.Box.call(this, type, size, uuid);
              this.boxes = [];
            },
            SampleEntry: function(type, size, hdr_size, start) {
              BoxParser.ContainerBox.call(this, type, size);
              this.hdr_size = hdr_size;
              this.start = start;
            },
            SampleGroupEntry: function(type) {
              this.grouping_type = type;
            },
            TrackGroupTypeBox: function(type, size) {
              BoxParser.FullBox.call(this, type, size);
            },
            createBoxCtor: function(type, parseMethod) {
              BoxParser.boxCodes.push(type);
              BoxParser[type + "Box"] = function(size) {
                BoxParser.Box.call(this, type, size);
              };
              BoxParser[type + "Box"].prototype = new BoxParser.Box();
              if (parseMethod) BoxParser[type + "Box"].prototype.parse = parseMethod;
            },
            createFullBoxCtor: function(type, parseMethod) {
              BoxParser[type + "Box"] = function(size) {
                BoxParser.FullBox.call(this, type, size);
              };
              BoxParser[type + "Box"].prototype = new BoxParser.FullBox();
              BoxParser[type + "Box"].prototype.parse = function(stream) {
                this.parseFullHeader(stream);
                if (parseMethod) {
                  parseMethod.call(this, stream);
                }
              };
            },
            addSubBoxArrays: function(subBoxNames) {
              if (subBoxNames) {
                this.subBoxNames = subBoxNames;
                var nbSubBoxes = subBoxNames.length;
                for (var k = 0; k < nbSubBoxes; k++) {
                  this[subBoxNames[k] + "s"] = [];
                }
              }
            },
            createContainerBoxCtor: function(type, parseMethod, subBoxNames) {
              BoxParser[type + "Box"] = function(size) {
                BoxParser.ContainerBox.call(this, type, size);
                BoxParser.addSubBoxArrays.call(this, subBoxNames);
              };
              BoxParser[type + "Box"].prototype = new BoxParser.ContainerBox();
              if (parseMethod) BoxParser[type + "Box"].prototype.parse = parseMethod;
            },
            createMediaSampleEntryCtor: function(mediaType, parseMethod, subBoxNames) {
              BoxParser.sampleEntryCodes[mediaType] = [];
              BoxParser[mediaType + "SampleEntry"] = function(type, size) {
                BoxParser.SampleEntry.call(this, type, size);
                BoxParser.addSubBoxArrays.call(this, subBoxNames);
              };
              BoxParser[mediaType + "SampleEntry"].prototype = new BoxParser.SampleEntry();
              if (parseMethod) BoxParser[mediaType + "SampleEntry"].prototype.parse = parseMethod;
            },
            createSampleEntryCtor: function(mediaType, type, parseMethod, subBoxNames) {
              BoxParser.sampleEntryCodes[mediaType].push(type);
              BoxParser[type + "SampleEntry"] = function(size) {
                BoxParser[mediaType + "SampleEntry"].call(this, type, size);
                BoxParser.addSubBoxArrays.call(this, subBoxNames);
              };
              BoxParser[type + "SampleEntry"].prototype = new BoxParser[mediaType + "SampleEntry"]();
              if (parseMethod) BoxParser[type + "SampleEntry"].prototype.parse = parseMethod;
            },
            createEncryptedSampleEntryCtor: function(mediaType, type, parseMethod) {
              BoxParser.createSampleEntryCtor.call(this, mediaType, type, parseMethod, ["sinf"]);
            },
            createSampleGroupCtor: function(type, parseMethod) {
              BoxParser[type + "SampleGroupEntry"] = function(size) {
                BoxParser.SampleGroupEntry.call(this, type, size);
              };
              BoxParser[type + "SampleGroupEntry"].prototype = new BoxParser.SampleGroupEntry();
              if (parseMethod) BoxParser[type + "SampleGroupEntry"].prototype.parse = parseMethod;
            },
            createTrackGroupCtor: function(type, parseMethod) {
              BoxParser[type + "TrackGroupTypeBox"] = function(size) {
                BoxParser.TrackGroupTypeBox.call(this, type, size);
              };
              BoxParser[type + "TrackGroupTypeBox"].prototype = new BoxParser.TrackGroupTypeBox();
              if (parseMethod) BoxParser[type + "TrackGroupTypeBox"].prototype.parse = parseMethod;
            },
            createUUIDBox: function(uuid, isFullBox, isContainerBox, parseMethod) {
              BoxParser.UUIDs.push(uuid);
              BoxParser.UUIDBoxes[uuid] = function(size) {
                if (isFullBox) {
                  BoxParser.FullBox.call(this, "uuid", size, uuid);
                } else {
                  if (isContainerBox) {
                    BoxParser.ContainerBox.call(this, "uuid", size, uuid);
                  } else {
                    BoxParser.Box.call(this, "uuid", size, uuid);
                  }
                }
              };
              BoxParser.UUIDBoxes[uuid].prototype = isFullBox ? new BoxParser.FullBox() : isContainerBox ? new BoxParser.ContainerBox() : new BoxParser.Box();
              if (parseMethod) {
                if (isFullBox) {
                  BoxParser.UUIDBoxes[uuid].prototype.parse = function(stream) {
                    this.parseFullHeader(stream);
                    if (parseMethod) {
                      parseMethod.call(this, stream);
                    }
                  };
                } else {
                  BoxParser.UUIDBoxes[uuid].prototype.parse = parseMethod;
                }
              }
            }
          };
          BoxParser.initialize();
          BoxParser.TKHD_FLAG_ENABLED = 1;
          BoxParser.TKHD_FLAG_IN_MOVIE = 2;
          BoxParser.TKHD_FLAG_IN_PREVIEW = 4;
          BoxParser.TFHD_FLAG_BASE_DATA_OFFSET = 1;
          BoxParser.TFHD_FLAG_SAMPLE_DESC = 2;
          BoxParser.TFHD_FLAG_SAMPLE_DUR = 8;
          BoxParser.TFHD_FLAG_SAMPLE_SIZE = 16;
          BoxParser.TFHD_FLAG_SAMPLE_FLAGS = 32;
          BoxParser.TFHD_FLAG_DUR_EMPTY = 65536;
          BoxParser.TFHD_FLAG_DEFAULT_BASE_IS_MOOF = 131072;
          BoxParser.TRUN_FLAGS_DATA_OFFSET = 1;
          BoxParser.TRUN_FLAGS_FIRST_FLAG = 4;
          BoxParser.TRUN_FLAGS_DURATION = 256;
          BoxParser.TRUN_FLAGS_SIZE = 512;
          BoxParser.TRUN_FLAGS_FLAGS = 1024;
          BoxParser.TRUN_FLAGS_CTS_OFFSET = 2048;
          BoxParser.Box.prototype.add = function(name) {
            return this.addBox(new BoxParser[name + "Box"]());
          };
          BoxParser.Box.prototype.addBox = function(box2) {
            this.boxes.push(box2);
            if (this[box2.type + "s"]) {
              this[box2.type + "s"].push(box2);
            } else {
              this[box2.type] = box2;
            }
            return box2;
          };
          BoxParser.Box.prototype.set = function(prop, value) {
            this[prop] = value;
            return this;
          };
          BoxParser.Box.prototype.addEntry = function(value, _prop) {
            var prop = _prop || "entries";
            if (!this[prop]) {
              this[prop] = [];
            }
            this[prop].push(value);
            return this;
          };
          {
            exports.BoxParser = BoxParser;
          }
          BoxParser.parseUUID = function(stream) {
            return BoxParser.parseHex16(stream);
          };
          BoxParser.parseHex16 = function(stream) {
            var hex16 = "";
            for (var i2 = 0; i2 < 16; i2++) {
              var hex = stream.readUint8().toString(16);
              hex16 += hex.length === 1 ? "0" + hex : hex;
            }
            return hex16;
          };
          BoxParser.parseOneBox = function(stream, headerOnly, parentSize) {
            var box2;
            var start = stream.getPosition();
            var hdr_size = 0;
            var diff;
            var uuid;
            if (stream.getEndPosition() - start < 8) {
              Log.debug("BoxParser", "Not enough data in stream to parse the type and size of the box");
              return { code: BoxParser.ERR_NOT_ENOUGH_DATA };
            }
            if (parentSize && parentSize < 8) {
              Log.debug("BoxParser", "Not enough bytes left in the parent box to parse a new box");
              return { code: BoxParser.ERR_NOT_ENOUGH_DATA };
            }
            var size = stream.readUint32();
            var type = stream.readString(4);
            var box_type = type;
            Log.debug("BoxParser", "Found box of type '" + type + "' and size " + size + " at position " + start);
            hdr_size = 8;
            if (type == "uuid") {
              if (stream.getEndPosition() - stream.getPosition() < 16 || parentSize - hdr_size < 16) {
                stream.seek(start);
                Log.debug("BoxParser", "Not enough bytes left in the parent box to parse a UUID box");
                return { code: BoxParser.ERR_NOT_ENOUGH_DATA };
              }
              uuid = BoxParser.parseUUID(stream);
              hdr_size += 16;
              box_type = uuid;
            }
            if (size == 1) {
              if (stream.getEndPosition() - stream.getPosition() < 8 || parentSize && parentSize - hdr_size < 8) {
                stream.seek(start);
                Log.warn("BoxParser", 'Not enough data in stream to parse the extended size of the "' + type + '" box');
                return { code: BoxParser.ERR_NOT_ENOUGH_DATA };
              }
              size = stream.readUint64();
              hdr_size += 8;
            } else if (size === 0) {
              if (parentSize) {
                size = parentSize;
              } else {
                if (type !== "mdat") {
                  Log.error("BoxParser", "Unlimited box size not supported for type: '" + type + "'");
                  box2 = new BoxParser.Box(type, size);
                  return { code: BoxParser.OK, box: box2, size: box2.size };
                }
              }
            }
            if (size !== 0 && size < hdr_size) {
              Log.error("BoxParser", "Box of type " + type + " has an invalid size " + size + " (too small to be a box)");
              return { code: BoxParser.ERR_NOT_ENOUGH_DATA, type, size, hdr_size, start };
            }
            if (size !== 0 && parentSize && size > parentSize) {
              Log.error("BoxParser", "Box of type '" + type + "' has a size " + size + " greater than its container size " + parentSize);
              return { code: BoxParser.ERR_NOT_ENOUGH_DATA, type, size, hdr_size, start };
            }
            if (size !== 0 && start + size > stream.getEndPosition()) {
              stream.seek(start);
              Log.info("BoxParser", "Not enough data in stream to parse the entire '" + type + "' box");
              return { code: BoxParser.ERR_NOT_ENOUGH_DATA, type, size, hdr_size, start };
            }
            if (headerOnly) {
              return { code: BoxParser.OK, type, size, hdr_size, start };
            } else {
              if (BoxParser[type + "Box"]) {
                box2 = new BoxParser[type + "Box"](size);
              } else {
                if (type !== "uuid") {
                  Log.warn("BoxParser", "Unknown box type: '" + type + "'");
                  box2 = new BoxParser.Box(type, size);
                  box2.has_unparsed_data = true;
                } else {
                  if (BoxParser.UUIDBoxes[uuid]) {
                    box2 = new BoxParser.UUIDBoxes[uuid](size);
                  } else {
                    Log.warn("BoxParser", "Unknown uuid type: '" + uuid + "'");
                    box2 = new BoxParser.Box(type, size);
                    box2.uuid = uuid;
                    box2.has_unparsed_data = true;
                  }
                }
              }
            }
            box2.hdr_size = hdr_size;
            box2.start = start;
            if (box2.write === BoxParser.Box.prototype.write && box2.type !== "mdat") {
              Log.info("BoxParser", "'" + box_type + "' box writing not yet implemented, keeping unparsed data in memory for later write");
              box2.parseDataAndRewind(stream);
            }
            box2.parse(stream);
            diff = stream.getPosition() - (box2.start + box2.size);
            if (diff < 0) {
              Log.warn("BoxParser", "Parsing of box '" + box_type + "' did not read the entire indicated box data size (missing " + -diff + " bytes), seeking forward");
              stream.seek(box2.start + box2.size);
            } else if (diff > 0) {
              Log.error("BoxParser", "Parsing of box '" + box_type + "' read " + diff + " more bytes than the indicated box data size, seeking backwards");
              if (box2.size !== 0) stream.seek(box2.start + box2.size);
            }
            return { code: BoxParser.OK, box: box2, size: box2.size };
          };
          BoxParser.Box.prototype.parse = function(stream) {
            if (this.type != "mdat") {
              this.data = stream.readUint8Array(this.size - this.hdr_size);
            } else {
              if (this.size === 0) {
                stream.seek(stream.getEndPosition());
              } else {
                stream.seek(this.start + this.size);
              }
            }
          };
          BoxParser.Box.prototype.parseDataAndRewind = function(stream) {
            this.data = stream.readUint8Array(this.size - this.hdr_size);
            stream.position -= this.size - this.hdr_size;
          };
          BoxParser.FullBox.prototype.parseDataAndRewind = function(stream) {
            this.parseFullHeader(stream);
            this.data = stream.readUint8Array(this.size - this.hdr_size);
            this.hdr_size -= 4;
            stream.position -= this.size - this.hdr_size;
          };
          BoxParser.FullBox.prototype.parseFullHeader = function(stream) {
            this.version = stream.readUint8();
            this.flags = stream.readUint24();
            this.hdr_size += 4;
          };
          BoxParser.FullBox.prototype.parse = function(stream) {
            this.parseFullHeader(stream);
            this.data = stream.readUint8Array(this.size - this.hdr_size);
          };
          BoxParser.ContainerBox.prototype.parse = function(stream) {
            var ret2;
            var box2;
            while (stream.getPosition() < this.start + this.size) {
              ret2 = BoxParser.parseOneBox(stream, false, this.size - (stream.getPosition() - this.start));
              if (ret2.code === BoxParser.OK) {
                box2 = ret2.box;
                this.boxes.push(box2);
                if (this.subBoxNames && this.subBoxNames.indexOf(box2.type) != -1) {
                  this[this.subBoxNames[this.subBoxNames.indexOf(box2.type)] + "s"].push(box2);
                } else {
                  var box_type = box2.type !== "uuid" ? box2.type : box2.uuid;
                  if (this[box_type]) {
                    Log.warn("Box of type " + box_type + " already stored in field of this type");
                  } else {
                    this[box_type] = box2;
                  }
                }
              } else {
                return;
              }
            }
          };
          BoxParser.Box.prototype.parseLanguage = function(stream) {
            this.language = stream.readUint16();
            var chars = [];
            chars[0] = this.language >> 10 & 31;
            chars[1] = this.language >> 5 & 31;
            chars[2] = this.language & 31;
            this.languageString = String.fromCharCode(chars[0] + 96, chars[1] + 96, chars[2] + 96);
          };
          BoxParser.SAMPLE_ENTRY_TYPE_VISUAL = "Visual";
          BoxParser.SAMPLE_ENTRY_TYPE_AUDIO = "Audio";
          BoxParser.SAMPLE_ENTRY_TYPE_HINT = "Hint";
          BoxParser.SAMPLE_ENTRY_TYPE_METADATA = "Metadata";
          BoxParser.SAMPLE_ENTRY_TYPE_SUBTITLE = "Subtitle";
          BoxParser.SAMPLE_ENTRY_TYPE_SYSTEM = "System";
          BoxParser.SAMPLE_ENTRY_TYPE_TEXT = "Text";
          BoxParser.SampleEntry.prototype.parseHeader = function(stream) {
            stream.readUint8Array(6);
            this.data_reference_index = stream.readUint16();
            this.hdr_size += 8;
          };
          BoxParser.SampleEntry.prototype.parse = function(stream) {
            this.parseHeader(stream);
            this.data = stream.readUint8Array(this.size - this.hdr_size);
          };
          BoxParser.SampleEntry.prototype.parseDataAndRewind = function(stream) {
            this.parseHeader(stream);
            this.data = stream.readUint8Array(this.size - this.hdr_size);
            this.hdr_size -= 8;
            stream.position -= this.size - this.hdr_size;
          };
          BoxParser.SampleEntry.prototype.parseFooter = function(stream) {
            BoxParser.ContainerBox.prototype.parse.call(this, stream);
          };
          BoxParser.createMediaSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_HINT);
          BoxParser.createMediaSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_METADATA);
          BoxParser.createMediaSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_SUBTITLE);
          BoxParser.createMediaSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_SYSTEM);
          BoxParser.createMediaSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_TEXT);
          BoxParser.createMediaSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, function(stream) {
            var compressorname_length;
            this.parseHeader(stream);
            stream.readUint16();
            stream.readUint16();
            stream.readUint32Array(3);
            this.width = stream.readUint16();
            this.height = stream.readUint16();
            this.horizresolution = stream.readUint32();
            this.vertresolution = stream.readUint32();
            stream.readUint32();
            this.frame_count = stream.readUint16();
            compressorname_length = Math.min(31, stream.readUint8());
            this.compressorname = stream.readString(compressorname_length);
            if (compressorname_length < 31) {
              stream.readString(31 - compressorname_length);
            }
            this.depth = stream.readUint16();
            stream.readUint16();
            this.parseFooter(stream);
          });
          BoxParser.createMediaSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_AUDIO, function(stream) {
            this.parseHeader(stream);
            stream.readUint32Array(2);
            this.channel_count = stream.readUint16();
            this.samplesize = stream.readUint16();
            stream.readUint16();
            stream.readUint16();
            this.samplerate = stream.readUint32() / (1 << 16);
            this.parseFooter(stream);
          });
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "avc1");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "avc2");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "avc3");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "avc4");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "av01");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "dav1");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "hvc1");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "hev1");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "hvt1");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "lhe1");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "dvh1");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "dvhe");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "vvc1");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "vvi1");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "vvs1");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "vvcN");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "vp08");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "vp09");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "avs3");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "j2ki");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "mjp2");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "mjpg");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "uncv");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_AUDIO, "mp4a");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_AUDIO, "ac-3");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_AUDIO, "ac-4");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_AUDIO, "ec-3");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_AUDIO, "Opus");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_AUDIO, "mha1");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_AUDIO, "mha2");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_AUDIO, "mhm1");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_AUDIO, "mhm2");
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_AUDIO, "fLaC");
          BoxParser.createEncryptedSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_VISUAL, "encv");
          BoxParser.createEncryptedSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_AUDIO, "enca");
          BoxParser.createEncryptedSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_SUBTITLE, "encu");
          BoxParser.createEncryptedSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_SYSTEM, "encs");
          BoxParser.createEncryptedSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_TEXT, "enct");
          BoxParser.createEncryptedSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_METADATA, "encm");
          BoxParser.createBoxCtor("a1lx", function(stream) {
            var large_size = stream.readUint8() & 1;
            var FieldLength = ((large_size & 1) + 1) * 16;
            this.layer_size = [];
            for (var i2 = 0; i2 < 3; i2++) {
              if (FieldLength == 16) {
                this.layer_size[i2] = stream.readUint16();
              } else {
                this.layer_size[i2] = stream.readUint32();
              }
            }
          });
          BoxParser.createBoxCtor("a1op", function(stream) {
            this.op_index = stream.readUint8();
          });
          BoxParser.createFullBoxCtor("auxC", function(stream) {
            this.aux_type = stream.readCString();
            var aux_subtype_length = this.size - this.hdr_size - (this.aux_type.length + 1);
            this.aux_subtype = stream.readUint8Array(aux_subtype_length);
          });
          BoxParser.createBoxCtor("av1C", function(stream) {
            var tmp = stream.readUint8();
            if (tmp >> 7 & false) {
              Log.error("av1C marker problem");
              return;
            }
            this.version = tmp & 127;
            if (this.version !== 1) {
              Log.error("av1C version " + this.version + " not supported");
              return;
            }
            tmp = stream.readUint8();
            this.seq_profile = tmp >> 5 & 7;
            this.seq_level_idx_0 = tmp & 31;
            tmp = stream.readUint8();
            this.seq_tier_0 = tmp >> 7 & 1;
            this.high_bitdepth = tmp >> 6 & 1;
            this.twelve_bit = tmp >> 5 & 1;
            this.monochrome = tmp >> 4 & 1;
            this.chroma_subsampling_x = tmp >> 3 & 1;
            this.chroma_subsampling_y = tmp >> 2 & 1;
            this.chroma_sample_position = tmp & 3;
            tmp = stream.readUint8();
            this.reserved_1 = tmp >> 5 & 7;
            if (this.reserved_1 !== 0) {
              Log.error("av1C reserved_1 parsing problem");
              return;
            }
            this.initial_presentation_delay_present = tmp >> 4 & 1;
            if (this.initial_presentation_delay_present === 1) {
              this.initial_presentation_delay_minus_one = tmp & 15;
            } else {
              this.reserved_2 = tmp & 15;
              if (this.reserved_2 !== 0) {
                Log.error("av1C reserved_2 parsing problem");
                return;
              }
            }
            var configOBUs_length = this.size - this.hdr_size - 4;
            this.configOBUs = stream.readUint8Array(configOBUs_length);
          });
          BoxParser.createBoxCtor("avcC", function(stream) {
            var i2;
            var toparse;
            this.configurationVersion = stream.readUint8();
            this.AVCProfileIndication = stream.readUint8();
            this.profile_compatibility = stream.readUint8();
            this.AVCLevelIndication = stream.readUint8();
            this.lengthSizeMinusOne = stream.readUint8() & 3;
            this.nb_SPS_nalus = stream.readUint8() & 31;
            toparse = this.size - this.hdr_size - 6;
            this.SPS = [];
            for (i2 = 0; i2 < this.nb_SPS_nalus; i2++) {
              this.SPS[i2] = {};
              this.SPS[i2].length = stream.readUint16();
              this.SPS[i2].nalu = stream.readUint8Array(this.SPS[i2].length);
              toparse -= 2 + this.SPS[i2].length;
            }
            this.nb_PPS_nalus = stream.readUint8();
            toparse--;
            this.PPS = [];
            for (i2 = 0; i2 < this.nb_PPS_nalus; i2++) {
              this.PPS[i2] = {};
              this.PPS[i2].length = stream.readUint16();
              this.PPS[i2].nalu = stream.readUint8Array(this.PPS[i2].length);
              toparse -= 2 + this.PPS[i2].length;
            }
            if (toparse > 0) {
              this.ext = stream.readUint8Array(toparse);
            }
          });
          BoxParser.createBoxCtor("btrt", function(stream) {
            this.bufferSizeDB = stream.readUint32();
            this.maxBitrate = stream.readUint32();
            this.avgBitrate = stream.readUint32();
          });
          BoxParser.createFullBoxCtor("ccst", function(stream) {
            var flags = stream.readUint8();
            this.all_ref_pics_intra = (flags & 128) == 128;
            this.intra_pred_used = (flags & 64) == 64;
            this.max_ref_per_pic = (flags & 63) >> 2;
            stream.readUint24();
          });
          BoxParser.createBoxCtor("cdef", function(stream) {
            var i2;
            this.channel_count = stream.readUint16();
            this.channel_indexes = [];
            this.channel_types = [];
            this.channel_associations = [];
            for (i2 = 0; i2 < this.channel_count; i2++) {
              this.channel_indexes.push(stream.readUint16());
              this.channel_types.push(stream.readUint16());
              this.channel_associations.push(stream.readUint16());
            }
          });
          BoxParser.createBoxCtor("clap", function(stream) {
            this.cleanApertureWidthN = stream.readUint32();
            this.cleanApertureWidthD = stream.readUint32();
            this.cleanApertureHeightN = stream.readUint32();
            this.cleanApertureHeightD = stream.readUint32();
            this.horizOffN = stream.readUint32();
            this.horizOffD = stream.readUint32();
            this.vertOffN = stream.readUint32();
            this.vertOffD = stream.readUint32();
          });
          BoxParser.createBoxCtor("clli", function(stream) {
            this.max_content_light_level = stream.readUint16();
            this.max_pic_average_light_level = stream.readUint16();
          });
          BoxParser.createFullBoxCtor("cmex", function(stream) {
            if (this.flags & 1) {
              this.pos_x = stream.readInt32();
            }
            if (this.flags & 2) {
              this.pos_y = stream.readInt32();
            }
            if (this.flags & 4) {
              this.pos_z = stream.readInt32();
            }
            if (this.flags & 8) {
              if (this.version == 0) {
                if (this.flags & 16) {
                  this.quat_x = stream.readInt32();
                  this.quat_y = stream.readInt32();
                  this.quat_z = stream.readInt32();
                } else {
                  this.quat_x = stream.readInt16();
                  this.quat_y = stream.readInt16();
                  this.quat_z = stream.readInt16();
                }
              } else if (this.version == 1) ;
            }
            if (this.flags & 32) {
              this.id = stream.readUint32();
            }
          });
          BoxParser.createFullBoxCtor("cmin", function(stream) {
            this.focal_length_x = stream.readInt32();
            this.principal_point_x = stream.readInt32();
            this.principal_point_y = stream.readInt32();
            if (this.flags & 1) {
              this.focal_length_y = stream.readInt32();
              this.skew_factor = stream.readInt32();
            }
          });
          BoxParser.createBoxCtor("cmpd", function(stream) {
            this.component_count = stream.readUint32();
            this.component_types = [];
            this.component_type_urls = [];
            for (i = 0; i < this.component_count; i++) {
              var component_type = stream.readUint16();
              this.component_types.push(component_type);
              if (component_type >= 32768) {
                this.component_type_urls.push(stream.readCString());
              }
            }
          });
          BoxParser.createFullBoxCtor("co64", function(stream) {
            var entry_count2;
            var i2;
            entry_count2 = stream.readUint32();
            this.chunk_offsets = [];
            if (this.version === 0) {
              for (i2 = 0; i2 < entry_count2; i2++) {
                this.chunk_offsets.push(stream.readUint64());
              }
            }
          });
          BoxParser.createFullBoxCtor("CoLL", function(stream) {
            this.maxCLL = stream.readUint16();
            this.maxFALL = stream.readUint16();
          });
          BoxParser.createBoxCtor("colr", function(stream) {
            this.colour_type = stream.readString(4);
            if (this.colour_type === "nclx") {
              this.colour_primaries = stream.readUint16();
              this.transfer_characteristics = stream.readUint16();
              this.matrix_coefficients = stream.readUint16();
              var tmp = stream.readUint8();
              this.full_range_flag = tmp >> 7;
            } else if (this.colour_type === "rICC") {
              this.ICC_profile = stream.readUint8Array(this.size - 4);
            } else if (this.colour_type === "prof") {
              this.ICC_profile = stream.readUint8Array(this.size - 4);
            }
          });
          BoxParser.createFullBoxCtor("cprt", function(stream) {
            this.parseLanguage(stream);
            this.notice = stream.readCString();
          });
          BoxParser.createFullBoxCtor("cslg", function(stream) {
            if (this.version === 0) {
              this.compositionToDTSShift = stream.readInt32();
              this.leastDecodeToDisplayDelta = stream.readInt32();
              this.greatestDecodeToDisplayDelta = stream.readInt32();
              this.compositionStartTime = stream.readInt32();
              this.compositionEndTime = stream.readInt32();
            }
          });
          BoxParser.createFullBoxCtor("ctts", function(stream) {
            var entry_count2;
            var i2;
            entry_count2 = stream.readUint32();
            this.sample_counts = [];
            this.sample_offsets = [];
            if (this.version === 0) {
              for (i2 = 0; i2 < entry_count2; i2++) {
                this.sample_counts.push(stream.readUint32());
                var value = stream.readInt32();
                if (value < 0) {
                  Log.warn("BoxParser", "ctts box uses negative values without using version 1");
                }
                this.sample_offsets.push(value);
              }
            } else if (this.version == 1) {
              for (i2 = 0; i2 < entry_count2; i2++) {
                this.sample_counts.push(stream.readUint32());
                this.sample_offsets.push(stream.readInt32());
              }
            }
          });
          BoxParser.createBoxCtor("dac3", function(stream) {
            var tmp_byte1 = stream.readUint8();
            var tmp_byte2 = stream.readUint8();
            var tmp_byte3 = stream.readUint8();
            this.fscod = tmp_byte1 >> 6;
            this.bsid = tmp_byte1 >> 1 & 31;
            this.bsmod = (tmp_byte1 & 1) << 2 | tmp_byte2 >> 6 & 3;
            this.acmod = tmp_byte2 >> 3 & 7;
            this.lfeon = tmp_byte2 >> 2 & 1;
            this.bit_rate_code = tmp_byte2 & 3 | tmp_byte3 >> 5 & 7;
          });
          BoxParser.createBoxCtor("dec3", function(stream) {
            var tmp_16 = stream.readUint16();
            this.data_rate = tmp_16 >> 3;
            this.num_ind_sub = tmp_16 & 7;
            this.ind_subs = [];
            for (var i2 = 0; i2 < this.num_ind_sub + 1; i2++) {
              var ind_sub = {};
              this.ind_subs.push(ind_sub);
              var tmp_byte1 = stream.readUint8();
              var tmp_byte2 = stream.readUint8();
              var tmp_byte3 = stream.readUint8();
              ind_sub.fscod = tmp_byte1 >> 6;
              ind_sub.bsid = tmp_byte1 >> 1 & 31;
              ind_sub.bsmod = (tmp_byte1 & 1) << 4 | tmp_byte2 >> 4 & 15;
              ind_sub.acmod = tmp_byte2 >> 1 & 7;
              ind_sub.lfeon = tmp_byte2 & 1;
              ind_sub.num_dep_sub = tmp_byte3 >> 1 & 15;
              if (ind_sub.num_dep_sub > 0) {
                ind_sub.chan_loc = (tmp_byte3 & 1) << 8 | stream.readUint8();
              }
            }
          });
          BoxParser.createFullBoxCtor("dfLa", function(stream) {
            var BLOCKTYPE_MASK = 127;
            var LASTMETADATABLOCKFLAG_MASK = 128;
            var boxesFound = [];
            var knownBlockTypes = [
              "STREAMINFO",
              "PADDING",
              "APPLICATION",
              "SEEKTABLE",
              "VORBIS_COMMENT",
              "CUESHEET",
              "PICTURE",
              "RESERVED"
            ];
            do {
              var flagAndType = stream.readUint8();
              var type = Math.min(
                flagAndType & BLOCKTYPE_MASK,
                knownBlockTypes.length - 1
              );
              if (!type) {
                stream.readUint8Array(13);
                this.samplerate = stream.readUint32() >> 12;
                stream.readUint8Array(20);
              } else {
                stream.readUint8Array(stream.readUint24());
              }
              boxesFound.push(knownBlockTypes[type]);
              if (!!(flagAndType & LASTMETADATABLOCKFLAG_MASK)) {
                break;
              }
            } while (true);
            this.numMetadataBlocks = boxesFound.length + " (" + boxesFound.join(", ") + ")";
          });
          BoxParser.createBoxCtor("dimm", function(stream) {
            this.bytessent = stream.readUint64();
          });
          BoxParser.createBoxCtor("dmax", function(stream) {
            this.time = stream.readUint32();
          });
          BoxParser.createBoxCtor("dmed", function(stream) {
            this.bytessent = stream.readUint64();
          });
          BoxParser.createBoxCtor("dOps", function(stream) {
            this.Version = stream.readUint8();
            this.OutputChannelCount = stream.readUint8();
            this.PreSkip = stream.readUint16();
            this.InputSampleRate = stream.readUint32();
            this.OutputGain = stream.readInt16();
            this.ChannelMappingFamily = stream.readUint8();
            if (this.ChannelMappingFamily !== 0) {
              this.StreamCount = stream.readUint8();
              this.CoupledCount = stream.readUint8();
              this.ChannelMapping = [];
              for (var i2 = 0; i2 < this.OutputChannelCount; i2++) {
                this.ChannelMapping[i2] = stream.readUint8();
              }
            }
          });
          BoxParser.createFullBoxCtor("dref", function(stream) {
            var ret2;
            var box2;
            this.entries = [];
            var entry_count2 = stream.readUint32();
            for (var i2 = 0; i2 < entry_count2; i2++) {
              ret2 = BoxParser.parseOneBox(stream, false, this.size - (stream.getPosition() - this.start));
              if (ret2.code === BoxParser.OK) {
                box2 = ret2.box;
                this.entries.push(box2);
              } else {
                return;
              }
            }
          });
          BoxParser.createBoxCtor("drep", function(stream) {
            this.bytessent = stream.readUint64();
          });
          BoxParser.createFullBoxCtor("elng", function(stream) {
            this.extended_language = stream.readString(this.size - this.hdr_size);
          });
          BoxParser.createFullBoxCtor("elst", function(stream) {
            this.entries = [];
            var entry_count2 = stream.readUint32();
            for (var i2 = 0; i2 < entry_count2; i2++) {
              var entry = {};
              this.entries.push(entry);
              if (this.version === 1) {
                entry.segment_duration = stream.readUint64();
                entry.media_time = stream.readInt64();
              } else {
                entry.segment_duration = stream.readUint32();
                entry.media_time = stream.readInt32();
              }
              entry.media_rate_integer = stream.readInt16();
              entry.media_rate_fraction = stream.readInt16();
            }
          });
          BoxParser.createFullBoxCtor("emsg", function(stream) {
            if (this.version == 1) {
              this.timescale = stream.readUint32();
              this.presentation_time = stream.readUint64();
              this.event_duration = stream.readUint32();
              this.id = stream.readUint32();
              this.scheme_id_uri = stream.readCString();
              this.value = stream.readCString();
            } else {
              this.scheme_id_uri = stream.readCString();
              this.value = stream.readCString();
              this.timescale = stream.readUint32();
              this.presentation_time_delta = stream.readUint32();
              this.event_duration = stream.readUint32();
              this.id = stream.readUint32();
            }
            var message_size = this.size - this.hdr_size - (4 * 4 + (this.scheme_id_uri.length + 1) + (this.value.length + 1));
            if (this.version == 1) {
              message_size -= 4;
            }
            this.message_data = stream.readUint8Array(message_size);
          });
          BoxParser.createEntityToGroupCtor = function(type, parseMethod) {
            BoxParser[type + "Box"] = function(size) {
              BoxParser.FullBox.call(this, type, size);
            };
            BoxParser[type + "Box"].prototype = new BoxParser.FullBox();
            BoxParser[type + "Box"].prototype.parse = function(stream) {
              this.parseFullHeader(stream);
              if (parseMethod) {
                parseMethod.call(this, stream);
              } else {
                this.group_id = stream.readUint32();
                this.num_entities_in_group = stream.readUint32();
                this.entity_ids = [];
                for (i = 0; i < this.num_entities_in_group; i++) {
                  var entity_id = stream.readUint32();
                  this.entity_ids.push(entity_id);
                }
              }
            };
          };
          BoxParser.createEntityToGroupCtor("aebr");
          BoxParser.createEntityToGroupCtor("afbr");
          BoxParser.createEntityToGroupCtor("albc");
          BoxParser.createEntityToGroupCtor("altr");
          BoxParser.createEntityToGroupCtor("brst");
          BoxParser.createEntityToGroupCtor("dobr");
          BoxParser.createEntityToGroupCtor("eqiv");
          BoxParser.createEntityToGroupCtor("favc");
          BoxParser.createEntityToGroupCtor("fobr");
          BoxParser.createEntityToGroupCtor("iaug");
          BoxParser.createEntityToGroupCtor("pano");
          BoxParser.createEntityToGroupCtor("slid");
          BoxParser.createEntityToGroupCtor("ster");
          BoxParser.createEntityToGroupCtor("tsyn");
          BoxParser.createEntityToGroupCtor("wbbr");
          BoxParser.createEntityToGroupCtor("prgr");
          BoxParser.createEntityToGroupCtor("pymd", function(stream) {
            this.group_id = stream.readUint32();
            this.num_entities_in_group = stream.readUint32();
            this.entity_ids = [];
            for (var i2 = 0; i2 < this.num_entities_in_group; i2++) {
              var entity_id = stream.readUint32();
              this.entity_ids.push(entity_id);
            }
            this.tile_size_x = stream.readUint16();
            this.tile_size_y = stream.readUint16();
            this.layer_binning = [];
            this.tiles_in_layer_column_minus1 = [];
            this.tiles_in_layer_row_minus1 = [];
            for (i2 = 0; i2 < this.num_entities_in_group; i2++) {
              this.layer_binning[i2] = stream.readUint16();
              this.tiles_in_layer_row_minus1[i2] = stream.readUint16();
              this.tiles_in_layer_column_minus1[i2] = stream.readUint16();
            }
          });
          BoxParser.createFullBoxCtor("esds", function(stream) {
            var esd_data = stream.readUint8Array(this.size - this.hdr_size);
            if (typeof MPEG4DescriptorParser !== "undefined") {
              var esd_parser = new MPEG4DescriptorParser();
              this.esd = esd_parser.parseOneDescriptor(new DataStream(esd_data.buffer, 0, DataStream.BIG_ENDIAN));
            }
          });
          BoxParser.createBoxCtor("fiel", function(stream) {
            this.fieldCount = stream.readUint8();
            this.fieldOrdering = stream.readUint8();
          });
          BoxParser.createBoxCtor("frma", function(stream) {
            this.data_format = stream.readString(4);
          });
          BoxParser.createBoxCtor("ftyp", function(stream) {
            var toparse = this.size - this.hdr_size;
            this.major_brand = stream.readString(4);
            this.minor_version = stream.readUint32();
            toparse -= 8;
            this.compatible_brands = [];
            var i2 = 0;
            while (toparse >= 4) {
              this.compatible_brands[i2] = stream.readString(4);
              toparse -= 4;
              i2++;
            }
          });
          BoxParser.createFullBoxCtor("hdlr", function(stream) {
            if (this.version === 0) {
              stream.readUint32();
              this.handler = stream.readString(4);
              stream.readUint32Array(3);
              this.name = stream.readString(this.size - this.hdr_size - 20);
              if (this.name[this.name.length - 1] === "\0") {
                this.name = this.name.slice(0, -1);
              }
            }
          });
          BoxParser.createBoxCtor("hvcC", function(stream) {
            var i2, j;
            var length;
            var tmp_byte;
            this.configurationVersion = stream.readUint8();
            tmp_byte = stream.readUint8();
            this.general_profile_space = tmp_byte >> 6;
            this.general_tier_flag = (tmp_byte & 32) >> 5;
            this.general_profile_idc = tmp_byte & 31;
            this.general_profile_compatibility = stream.readUint32();
            this.general_constraint_indicator = stream.readUint8Array(6);
            this.general_level_idc = stream.readUint8();
            this.min_spatial_segmentation_idc = stream.readUint16() & 4095;
            this.parallelismType = stream.readUint8() & 3;
            this.chroma_format_idc = stream.readUint8() & 3;
            this.bit_depth_luma_minus8 = stream.readUint8() & 7;
            this.bit_depth_chroma_minus8 = stream.readUint8() & 7;
            this.avgFrameRate = stream.readUint16();
            tmp_byte = stream.readUint8();
            this.constantFrameRate = tmp_byte >> 6;
            this.numTemporalLayers = (tmp_byte & 13) >> 3;
            this.temporalIdNested = (tmp_byte & 4) >> 2;
            this.lengthSizeMinusOne = tmp_byte & 3;
            this.nalu_arrays = [];
            var numOfArrays = stream.readUint8();
            for (i2 = 0; i2 < numOfArrays; i2++) {
              var nalu_array = [];
              this.nalu_arrays.push(nalu_array);
              tmp_byte = stream.readUint8();
              nalu_array.completeness = (tmp_byte & 128) >> 7;
              nalu_array.nalu_type = tmp_byte & 63;
              var numNalus = stream.readUint16();
              for (j = 0; j < numNalus; j++) {
                var nalu = {};
                nalu_array.push(nalu);
                length = stream.readUint16();
                nalu.data = stream.readUint8Array(length);
              }
            }
          });
          BoxParser.createFullBoxCtor("iinf", function(stream) {
            var ret2;
            if (this.version === 0) {
              this.entry_count = stream.readUint16();
            } else {
              this.entry_count = stream.readUint32();
            }
            this.item_infos = [];
            for (var i2 = 0; i2 < this.entry_count; i2++) {
              ret2 = BoxParser.parseOneBox(stream, false, this.size - (stream.getPosition() - this.start));
              if (ret2.code === BoxParser.OK) {
                if (ret2.box.type !== "infe") {
                  Log.error("BoxParser", "Expected 'infe' box, got " + ret2.box.type);
                }
                this.item_infos[i2] = ret2.box;
              } else {
                return;
              }
            }
          });
          BoxParser.createFullBoxCtor("iloc", function(stream) {
            var byte;
            byte = stream.readUint8();
            this.offset_size = byte >> 4 & 15;
            this.length_size = byte & 15;
            byte = stream.readUint8();
            this.base_offset_size = byte >> 4 & 15;
            if (this.version === 1 || this.version === 2) {
              this.index_size = byte & 15;
            } else {
              this.index_size = 0;
            }
            this.items = [];
            var item_count = 0;
            if (this.version < 2) {
              item_count = stream.readUint16();
            } else if (this.version === 2) {
              item_count = stream.readUint32();
            } else {
              throw "version of iloc box not supported";
            }
            for (var i2 = 0; i2 < item_count; i2++) {
              var item = {};
              this.items.push(item);
              if (this.version < 2) {
                item.item_ID = stream.readUint16();
              } else if (this.version === 2) {
                item.item_ID = stream.readUint32();
              } else {
                throw "version of iloc box not supported";
              }
              if (this.version === 1 || this.version === 2) {
                item.construction_method = stream.readUint16() & 15;
              } else {
                item.construction_method = 0;
              }
              item.data_reference_index = stream.readUint16();
              switch (this.base_offset_size) {
                case 0:
                  item.base_offset = 0;
                  break;
                case 4:
                  item.base_offset = stream.readUint32();
                  break;
                case 8:
                  item.base_offset = stream.readUint64();
                  break;
                default:
                  throw "Error reading base offset size";
              }
              var extent_count = stream.readUint16();
              item.extents = [];
              for (var j = 0; j < extent_count; j++) {
                var extent = {};
                item.extents.push(extent);
                if (this.version === 1 || this.version === 2) {
                  switch (this.index_size) {
                    case 0:
                      extent.extent_index = 0;
                      break;
                    case 4:
                      extent.extent_index = stream.readUint32();
                      break;
                    case 8:
                      extent.extent_index = stream.readUint64();
                      break;
                    default:
                      throw "Error reading extent index";
                  }
                }
                switch (this.offset_size) {
                  case 0:
                    extent.extent_offset = 0;
                    break;
                  case 4:
                    extent.extent_offset = stream.readUint32();
                    break;
                  case 8:
                    extent.extent_offset = stream.readUint64();
                    break;
                  default:
                    throw "Error reading extent index";
                }
                switch (this.length_size) {
                  case 0:
                    extent.extent_length = 0;
                    break;
                  case 4:
                    extent.extent_length = stream.readUint32();
                    break;
                  case 8:
                    extent.extent_length = stream.readUint64();
                    break;
                  default:
                    throw "Error reading extent index";
                }
              }
            }
          });
          BoxParser.createBoxCtor("imir", function(stream) {
            var tmp = stream.readUint8();
            this.reserved = tmp >> 7;
            this.axis = tmp & 1;
          });
          BoxParser.createFullBoxCtor("infe", function(stream) {
            if (this.version === 0 || this.version === 1) {
              this.item_ID = stream.readUint16();
              this.item_protection_index = stream.readUint16();
              this.item_name = stream.readCString();
              this.content_type = stream.readCString();
              this.content_encoding = stream.readCString();
            }
            if (this.version === 1) {
              this.extension_type = stream.readString(4);
              Log.warn("BoxParser", "Cannot parse extension type");
              stream.seek(this.start + this.size);
              return;
            }
            if (this.version >= 2) {
              if (this.version === 2) {
                this.item_ID = stream.readUint16();
              } else if (this.version === 3) {
                this.item_ID = stream.readUint32();
              }
              this.item_protection_index = stream.readUint16();
              this.item_type = stream.readString(4);
              this.item_name = stream.readCString();
              if (this.item_type === "mime") {
                this.content_type = stream.readCString();
                this.content_encoding = stream.readCString();
              } else if (this.item_type === "uri ") {
                this.item_uri_type = stream.readCString();
              }
            }
          });
          BoxParser.createFullBoxCtor("ipma", function(stream) {
            var i2, j;
            entry_count = stream.readUint32();
            this.associations = [];
            for (i2 = 0; i2 < entry_count; i2++) {
              var item_assoc = {};
              this.associations.push(item_assoc);
              if (this.version < 1) {
                item_assoc.id = stream.readUint16();
              } else {
                item_assoc.id = stream.readUint32();
              }
              var association_count = stream.readUint8();
              item_assoc.props = [];
              for (j = 0; j < association_count; j++) {
                var tmp = stream.readUint8();
                var p = {};
                item_assoc.props.push(p);
                p.essential = (tmp & 128) >> 7 === 1;
                if (this.flags & 1) {
                  p.property_index = (tmp & 127) << 8 | stream.readUint8();
                } else {
                  p.property_index = tmp & 127;
                }
              }
            }
          });
          BoxParser.createFullBoxCtor("iref", function(stream) {
            var ret2;
            var box2;
            this.references = [];
            while (stream.getPosition() < this.start + this.size) {
              ret2 = BoxParser.parseOneBox(stream, true, this.size - (stream.getPosition() - this.start));
              if (ret2.code === BoxParser.OK) {
                if (this.version === 0) {
                  box2 = new BoxParser.SingleItemTypeReferenceBox(ret2.type, ret2.size, ret2.hdr_size, ret2.start);
                } else {
                  box2 = new BoxParser.SingleItemTypeReferenceBoxLarge(ret2.type, ret2.size, ret2.hdr_size, ret2.start);
                }
                if (box2.write === BoxParser.Box.prototype.write && box2.type !== "mdat") {
                  Log.warn("BoxParser", box2.type + " box writing not yet implemented, keeping unparsed data in memory for later write");
                  box2.parseDataAndRewind(stream);
                }
                box2.parse(stream);
                this.references.push(box2);
              } else {
                return;
              }
            }
          });
          BoxParser.createBoxCtor("irot", function(stream) {
            this.angle = stream.readUint8() & 3;
          });
          BoxParser.createFullBoxCtor("ispe", function(stream) {
            this.image_width = stream.readUint32();
            this.image_height = stream.readUint32();
          });
          BoxParser.createFullBoxCtor("kind", function(stream) {
            this.schemeURI = stream.readCString();
            this.value = stream.readCString();
          });
          BoxParser.createFullBoxCtor("leva", function(stream) {
            var count = stream.readUint8();
            this.levels = [];
            for (var i2 = 0; i2 < count; i2++) {
              var level = {};
              this.levels[i2] = level;
              level.track_ID = stream.readUint32();
              var tmp_byte = stream.readUint8();
              level.padding_flag = tmp_byte >> 7;
              level.assignment_type = tmp_byte & 127;
              switch (level.assignment_type) {
                case 0:
                  level.grouping_type = stream.readString(4);
                  break;
                case 1:
                  level.grouping_type = stream.readString(4);
                  level.grouping_type_parameter = stream.readUint32();
                  break;
                case 2:
                  break;
                case 3:
                  break;
                case 4:
                  level.sub_track_id = stream.readUint32();
                  break;
                default:
                  Log.warn("BoxParser", "Unknown leva assignement type");
              }
            }
          });
          BoxParser.createBoxCtor("lhvC", function(stream) {
            var i2, j;
            var tmp_byte;
            this.configurationVersion = stream.readUint8();
            this.min_spatial_segmentation_idc = stream.readUint16() & 4095;
            this.parallelismType = stream.readUint8() & 3;
            tmp_byte = stream.readUint8();
            this.numTemporalLayers = (tmp_byte & 13) >> 3;
            this.temporalIdNested = (tmp_byte & 4) >> 2;
            this.lengthSizeMinusOne = tmp_byte & 3;
            this.nalu_arrays = [];
            var numOfArrays = stream.readUint8();
            for (i2 = 0; i2 < numOfArrays; i2++) {
              var nalu_array = [];
              this.nalu_arrays.push(nalu_array);
              tmp_byte = stream.readUint8();
              nalu_array.completeness = (tmp_byte & 128) >> 7;
              nalu_array.nalu_type = tmp_byte & 63;
              var numNalus = stream.readUint16();
              for (j = 0; j < numNalus; j++) {
                var nalu = {};
                nalu_array.push(nalu);
                var length = stream.readUint16();
                nalu.data = stream.readUint8Array(length);
              }
            }
          });
          BoxParser.createBoxCtor("lsel", function(stream) {
            this.layer_id = stream.readUint16();
          });
          BoxParser.createBoxCtor("maxr", function(stream) {
            this.period = stream.readUint32();
            this.bytes = stream.readUint32();
          });
          function ColorPoint(x, y) {
            this.x = x;
            this.y = y;
          }
          ColorPoint.prototype.toString = function() {
            return "(" + this.x + "," + this.y + ")";
          };
          BoxParser.createBoxCtor("mdcv", function(stream) {
            this.display_primaries = [];
            this.display_primaries[0] = new ColorPoint(stream.readUint16(), stream.readUint16());
            this.display_primaries[1] = new ColorPoint(stream.readUint16(), stream.readUint16());
            this.display_primaries[2] = new ColorPoint(stream.readUint16(), stream.readUint16());
            this.white_point = new ColorPoint(stream.readUint16(), stream.readUint16());
            this.max_display_mastering_luminance = stream.readUint32();
            this.min_display_mastering_luminance = stream.readUint32();
          });
          BoxParser.createFullBoxCtor("mdhd", function(stream) {
            if (this.version == 1) {
              this.creation_time = stream.readUint64();
              this.modification_time = stream.readUint64();
              this.timescale = stream.readUint32();
              this.duration = stream.readUint64();
            } else {
              this.creation_time = stream.readUint32();
              this.modification_time = stream.readUint32();
              this.timescale = stream.readUint32();
              this.duration = stream.readUint32();
            }
            this.parseLanguage(stream);
            stream.readUint16();
          });
          BoxParser.createFullBoxCtor("mehd", function(stream) {
            if (this.flags & 1) {
              Log.warn("BoxParser", "mehd box incorrectly uses flags set to 1, converting version to 1");
              this.version = 1;
            }
            if (this.version == 1) {
              this.fragment_duration = stream.readUint64();
            } else {
              this.fragment_duration = stream.readUint32();
            }
          });
          BoxParser.createFullBoxCtor("meta", function(stream) {
            this.boxes = [];
            BoxParser.ContainerBox.prototype.parse.call(this, stream);
          });
          BoxParser.createFullBoxCtor("mfhd", function(stream) {
            this.sequence_number = stream.readUint32();
          });
          BoxParser.createFullBoxCtor("mfro", function(stream) {
            this._size = stream.readUint32();
          });
          BoxParser.createFullBoxCtor("mskC", function(stream) {
            this.bits_per_pixel = stream.readUint8();
          });
          BoxParser.createFullBoxCtor("mvhd", function(stream) {
            if (this.version == 1) {
              this.creation_time = stream.readUint64();
              this.modification_time = stream.readUint64();
              this.timescale = stream.readUint32();
              this.duration = stream.readUint64();
            } else {
              this.creation_time = stream.readUint32();
              this.modification_time = stream.readUint32();
              this.timescale = stream.readUint32();
              this.duration = stream.readUint32();
            }
            this.rate = stream.readUint32();
            this.volume = stream.readUint16() >> 8;
            stream.readUint16();
            stream.readUint32Array(2);
            this.matrix = stream.readUint32Array(9);
            stream.readUint32Array(6);
            this.next_track_id = stream.readUint32();
          });
          BoxParser.createBoxCtor("npck", function(stream) {
            this.packetssent = stream.readUint32();
          });
          BoxParser.createBoxCtor("nump", function(stream) {
            this.packetssent = stream.readUint64();
          });
          BoxParser.createFullBoxCtor("padb", function(stream) {
            var sample_count = stream.readUint32();
            this.padbits = [];
            for (var i2 = 0; i2 < Math.floor((sample_count + 1) / 2); i2++) {
              this.padbits = stream.readUint8();
            }
          });
          BoxParser.createBoxCtor("pasp", function(stream) {
            this.hSpacing = stream.readUint32();
            this.vSpacing = stream.readUint32();
          });
          BoxParser.createBoxCtor("payl", function(stream) {
            this.text = stream.readString(this.size - this.hdr_size);
          });
          BoxParser.createBoxCtor("payt", function(stream) {
            this.payloadID = stream.readUint32();
            var count = stream.readUint8();
            this.rtpmap_string = stream.readString(count);
          });
          BoxParser.createFullBoxCtor("pdin", function(stream) {
            var count = (this.size - this.hdr_size) / 8;
            this.rate = [];
            this.initial_delay = [];
            for (var i2 = 0; i2 < count; i2++) {
              this.rate[i2] = stream.readUint32();
              this.initial_delay[i2] = stream.readUint32();
            }
          });
          BoxParser.createFullBoxCtor("pitm", function(stream) {
            if (this.version === 0) {
              this.item_id = stream.readUint16();
            } else {
              this.item_id = stream.readUint32();
            }
          });
          BoxParser.createFullBoxCtor("pixi", function(stream) {
            var i2;
            this.num_channels = stream.readUint8();
            this.bits_per_channels = [];
            for (i2 = 0; i2 < this.num_channels; i2++) {
              this.bits_per_channels[i2] = stream.readUint8();
            }
          });
          BoxParser.createBoxCtor("pmax", function(stream) {
            this.bytes = stream.readUint32();
          });
          BoxParser.createFullBoxCtor("prdi", function(stream) {
            this.step_count = stream.readUint16();
            this.item_count = [];
            if (this.flags & 2) {
              for (var i2 = 0; i2 < this.step_count; i2++) {
                this.item_count[i2] = stream.readUint16();
              }
            }
          });
          BoxParser.createFullBoxCtor("prft", function(stream) {
            this.ref_track_id = stream.readUint32();
            this.ntp_timestamp = stream.readUint64();
            if (this.version === 0) {
              this.media_time = stream.readUint32();
            } else {
              this.media_time = stream.readUint64();
            }
          });
          BoxParser.createFullBoxCtor("pssh", function(stream) {
            this.system_id = BoxParser.parseHex16(stream);
            if (this.version > 0) {
              var count = stream.readUint32();
              this.kid = [];
              for (var i2 = 0; i2 < count; i2++) {
                this.kid[i2] = BoxParser.parseHex16(stream);
              }
            }
            var datasize = stream.readUint32();
            if (datasize > 0) {
              this.data = stream.readUint8Array(datasize);
            }
          });
          BoxParser.createFullBoxCtor("clef", function(stream) {
            this.width = stream.readUint32();
            this.height = stream.readUint32();
          });
          BoxParser.createFullBoxCtor("enof", function(stream) {
            this.width = stream.readUint32();
            this.height = stream.readUint32();
          });
          BoxParser.createFullBoxCtor("prof", function(stream) {
            this.width = stream.readUint32();
            this.height = stream.readUint32();
          });
          BoxParser.createContainerBoxCtor("tapt", null, ["clef", "prof", "enof"]);
          BoxParser.createBoxCtor("rtp ", function(stream) {
            this.descriptionformat = stream.readString(4);
            this.sdptext = stream.readString(this.size - this.hdr_size - 4);
          });
          BoxParser.createFullBoxCtor("saio", function(stream) {
            if (this.flags & 1) {
              this.aux_info_type = stream.readString(4);
              this.aux_info_type_parameter = stream.readUint32();
            }
            var count = stream.readUint32();
            this.offset = [];
            for (var i2 = 0; i2 < count; i2++) {
              if (this.version === 0) {
                this.offset[i2] = stream.readUint32();
              } else {
                this.offset[i2] = stream.readUint64();
              }
            }
          });
          BoxParser.createFullBoxCtor("saiz", function(stream) {
            if (this.flags & 1) {
              this.aux_info_type = stream.readString(4);
              this.aux_info_type_parameter = stream.readUint32();
            }
            this.default_sample_info_size = stream.readUint8();
            this.sample_count = stream.readUint32();
            this.sample_info_size = [];
            if (this.default_sample_info_size === 0) {
              for (var i2 = 0; i2 < this.sample_count; i2++) {
                this.sample_info_size[i2] = stream.readUint8();
              }
            }
          });
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_METADATA, "mett", function(stream) {
            this.parseHeader(stream);
            this.content_encoding = stream.readCString();
            this.mime_format = stream.readCString();
            this.parseFooter(stream);
          });
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_METADATA, "metx", function(stream) {
            this.parseHeader(stream);
            this.content_encoding = stream.readCString();
            this.namespace = stream.readCString();
            this.schema_location = stream.readCString();
            this.parseFooter(stream);
          });
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_SUBTITLE, "sbtt", function(stream) {
            this.parseHeader(stream);
            this.content_encoding = stream.readCString();
            this.mime_format = stream.readCString();
            this.parseFooter(stream);
          });
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_SUBTITLE, "stpp", function(stream) {
            this.parseHeader(stream);
            this.namespace = stream.readCString();
            this.schema_location = stream.readCString();
            this.auxiliary_mime_types = stream.readCString();
            this.parseFooter(stream);
          });
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_SUBTITLE, "stxt", function(stream) {
            this.parseHeader(stream);
            this.content_encoding = stream.readCString();
            this.mime_format = stream.readCString();
            this.parseFooter(stream);
          });
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_SUBTITLE, "tx3g", function(stream) {
            this.parseHeader(stream);
            this.displayFlags = stream.readUint32();
            this.horizontal_justification = stream.readInt8();
            this.vertical_justification = stream.readInt8();
            this.bg_color_rgba = stream.readUint8Array(4);
            this.box_record = stream.readInt16Array(4);
            this.style_record = stream.readUint8Array(12);
            this.parseFooter(stream);
          });
          BoxParser.createSampleEntryCtor(BoxParser.SAMPLE_ENTRY_TYPE_METADATA, "wvtt", function(stream) {
            this.parseHeader(stream);
            this.parseFooter(stream);
          });
          BoxParser.createSampleGroupCtor("alst", function(stream) {
            var i2;
            var roll_count = stream.readUint16();
            this.first_output_sample = stream.readUint16();
            this.sample_offset = [];
            for (i2 = 0; i2 < roll_count; i2++) {
              this.sample_offset[i2] = stream.readUint32();
            }
            var remaining = this.description_length - 4 - 4 * roll_count;
            this.num_output_samples = [];
            this.num_total_samples = [];
            for (i2 = 0; i2 < remaining / 4; i2++) {
              this.num_output_samples[i2] = stream.readUint16();
              this.num_total_samples[i2] = stream.readUint16();
            }
          });
          BoxParser.createSampleGroupCtor("avll", function(stream) {
            this.layerNumber = stream.readUint8();
            this.accurateStatisticsFlag = stream.readUint8();
            this.avgBitRate = stream.readUint16();
            this.avgFrameRate = stream.readUint16();
          });
          BoxParser.createSampleGroupCtor("avss", function(stream) {
            this.subSequenceIdentifier = stream.readUint16();
            this.layerNumber = stream.readUint8();
            var tmp_byte = stream.readUint8();
            this.durationFlag = tmp_byte >> 7;
            this.avgRateFlag = tmp_byte >> 6 & 1;
            if (this.durationFlag) {
              this.duration = stream.readUint32();
            }
            if (this.avgRateFlag) {
              this.accurateStatisticsFlag = stream.readUint8();
              this.avgBitRate = stream.readUint16();
              this.avgFrameRate = stream.readUint16();
            }
            this.dependency = [];
            var numReferences = stream.readUint8();
            for (var i2 = 0; i2 < numReferences; i2++) {
              var dependencyInfo = {};
              this.dependency.push(dependencyInfo);
              dependencyInfo.subSeqDirectionFlag = stream.readUint8();
              dependencyInfo.layerNumber = stream.readUint8();
              dependencyInfo.subSequenceIdentifier = stream.readUint16();
            }
          });
          BoxParser.createSampleGroupCtor("dtrt", function(stream) {
            Log.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
          });
          BoxParser.createSampleGroupCtor("mvif", function(stream) {
            Log.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
          });
          BoxParser.createSampleGroupCtor("prol", function(stream) {
            this.roll_distance = stream.readInt16();
          });
          BoxParser.createSampleGroupCtor("rap ", function(stream) {
            var tmp_byte = stream.readUint8();
            this.num_leading_samples_known = tmp_byte >> 7;
            this.num_leading_samples = tmp_byte & 127;
          });
          BoxParser.createSampleGroupCtor("rash", function(stream) {
            this.operation_point_count = stream.readUint16();
            if (this.description_length !== 2 + (this.operation_point_count === 1 ? 2 : this.operation_point_count * 6) + 9) {
              Log.warn("BoxParser", "Mismatch in " + this.grouping_type + " sample group length");
              this.data = stream.readUint8Array(this.description_length - 2);
            } else {
              if (this.operation_point_count === 1) {
                this.target_rate_share = stream.readUint16();
              } else {
                this.target_rate_share = [];
                this.available_bitrate = [];
                for (var i2 = 0; i2 < this.operation_point_count; i2++) {
                  this.available_bitrate[i2] = stream.readUint32();
                  this.target_rate_share[i2] = stream.readUint16();
                }
              }
              this.maximum_bitrate = stream.readUint32();
              this.minimum_bitrate = stream.readUint32();
              this.discard_priority = stream.readUint8();
            }
          });
          BoxParser.createSampleGroupCtor("roll", function(stream) {
            this.roll_distance = stream.readInt16();
          });
          BoxParser.SampleGroupEntry.prototype.parse = function(stream) {
            Log.warn("BoxParser", "Unknown Sample Group type: " + this.grouping_type);
            this.data = stream.readUint8Array(this.description_length);
          };
          BoxParser.createSampleGroupCtor("scif", function(stream) {
            Log.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
          });
          BoxParser.createSampleGroupCtor("scnm", function(stream) {
            Log.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
          });
          BoxParser.createSampleGroupCtor("seig", function(stream) {
            this.reserved = stream.readUint8();
            var tmp = stream.readUint8();
            this.crypt_byte_block = tmp >> 4;
            this.skip_byte_block = tmp & 15;
            this.isProtected = stream.readUint8();
            this.Per_Sample_IV_Size = stream.readUint8();
            this.KID = BoxParser.parseHex16(stream);
            this.constant_IV_size = 0;
            this.constant_IV = 0;
            if (this.isProtected === 1 && this.Per_Sample_IV_Size === 0) {
              this.constant_IV_size = stream.readUint8();
              this.constant_IV = stream.readUint8Array(this.constant_IV_size);
            }
          });
          BoxParser.createSampleGroupCtor("stsa", function(stream) {
            Log.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
          });
          BoxParser.createSampleGroupCtor("sync", function(stream) {
            var tmp_byte = stream.readUint8();
            this.NAL_unit_type = tmp_byte & 63;
          });
          BoxParser.createSampleGroupCtor("tele", function(stream) {
            var tmp_byte = stream.readUint8();
            this.level_independently_decodable = tmp_byte >> 7;
          });
          BoxParser.createSampleGroupCtor("tsas", function(stream) {
            Log.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
          });
          BoxParser.createSampleGroupCtor("tscl", function(stream) {
            Log.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
          });
          BoxParser.createSampleGroupCtor("vipr", function(stream) {
            Log.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
          });
          BoxParser.createFullBoxCtor("sbgp", function(stream) {
            this.grouping_type = stream.readString(4);
            if (this.version === 1) {
              this.grouping_type_parameter = stream.readUint32();
            } else {
              this.grouping_type_parameter = 0;
            }
            this.entries = [];
            var entry_count2 = stream.readUint32();
            for (var i2 = 0; i2 < entry_count2; i2++) {
              var entry = {};
              this.entries.push(entry);
              entry.sample_count = stream.readInt32();
              entry.group_description_index = stream.readInt32();
            }
          });
          function Pixel(row, col) {
            this.bad_pixel_row = row;
            this.bad_pixel_column = col;
          }
          Pixel.prototype.toString = function pixelToString() {
            return "[row: " + this.bad_pixel_row + ", column: " + this.bad_pixel_column + "]";
          };
          BoxParser.createFullBoxCtor("sbpm", function(stream) {
            var i2;
            this.component_count = stream.readUint16();
            this.component_index = [];
            for (i2 = 0; i2 < this.component_count; i2++) {
              this.component_index.push(stream.readUint16());
            }
            var flags = stream.readUint8();
            this.correction_applied = 128 == (flags & 128);
            this.num_bad_rows = stream.readUint32();
            this.num_bad_cols = stream.readUint32();
            this.num_bad_pixels = stream.readUint32();
            this.bad_rows = [];
            this.bad_columns = [];
            this.bad_pixels = [];
            for (i2 = 0; i2 < this.num_bad_rows; i2++) {
              this.bad_rows.push(stream.readUint32());
            }
            for (i2 = 0; i2 < this.num_bad_cols; i2++) {
              this.bad_columns.push(stream.readUint32());
            }
            for (i2 = 0; i2 < this.num_bad_pixels; i2++) {
              var row = stream.readUint32();
              var col = stream.readUint32();
              this.bad_pixels.push(new Pixel(row, col));
            }
          });
          BoxParser.createFullBoxCtor("schm", function(stream) {
            this.scheme_type = stream.readString(4);
            this.scheme_version = stream.readUint32();
            if (this.flags & 1) {
              this.scheme_uri = stream.readString(this.size - this.hdr_size - 8);
            }
          });
          BoxParser.createBoxCtor("sdp ", function(stream) {
            this.sdptext = stream.readString(this.size - this.hdr_size);
          });
          BoxParser.createFullBoxCtor("sdtp", function(stream) {
            var tmp_byte;
            var count = this.size - this.hdr_size;
            this.is_leading = [];
            this.sample_depends_on = [];
            this.sample_is_depended_on = [];
            this.sample_has_redundancy = [];
            for (var i2 = 0; i2 < count; i2++) {
              tmp_byte = stream.readUint8();
              this.is_leading[i2] = tmp_byte >> 6;
              this.sample_depends_on[i2] = tmp_byte >> 4 & 3;
              this.sample_is_depended_on[i2] = tmp_byte >> 2 & 3;
              this.sample_has_redundancy[i2] = tmp_byte & 3;
            }
          });
          BoxParser.createFullBoxCtor(
            "senc"
            /*, function(stream) {
            	this.parseFullHeader(stream);
            	var sample_count = stream.readUint32();
            	this.samples = [];
            	for (var i = 0; i < sample_count; i++) {
            		var sample = {};
            		// tenc.default_Per_Sample_IV_Size or seig.Per_Sample_IV_Size
            		sample.InitializationVector = this.readUint8Array(Per_Sample_IV_Size*8);
            		if (this.flags & 0x2) {
            			sample.subsamples = [];
            			subsample_count = stream.readUint16();
            			for (var j = 0; j < subsample_count; j++) {
            				var subsample = {};
            				subsample.BytesOfClearData = stream.readUint16();
            				subsample.BytesOfProtectedData = stream.readUint32();
            				sample.subsamples.push(subsample);
            			}
            		}
            		// TODO
            		this.samples.push(sample);
            	}
            }*/
          );
          BoxParser.createFullBoxCtor("sgpd", function(stream) {
            this.grouping_type = stream.readString(4);
            Log.debug("BoxParser", "Found Sample Groups of type " + this.grouping_type);
            if (this.version === 1) {
              this.default_length = stream.readUint32();
            } else {
              this.default_length = 0;
            }
            if (this.version >= 2) {
              this.default_group_description_index = stream.readUint32();
            }
            this.entries = [];
            var entry_count2 = stream.readUint32();
            for (var i2 = 0; i2 < entry_count2; i2++) {
              var entry;
              if (BoxParser[this.grouping_type + "SampleGroupEntry"]) {
                entry = new BoxParser[this.grouping_type + "SampleGroupEntry"](this.grouping_type);
              } else {
                entry = new BoxParser.SampleGroupEntry(this.grouping_type);
              }
              this.entries.push(entry);
              if (this.version === 1) {
                if (this.default_length === 0) {
                  entry.description_length = stream.readUint32();
                } else {
                  entry.description_length = this.default_length;
                }
              } else {
                entry.description_length = this.default_length;
              }
              if (entry.write === BoxParser.SampleGroupEntry.prototype.write) {
                Log.info("BoxParser", "SampleGroup for type " + this.grouping_type + " writing not yet implemented, keeping unparsed data in memory for later write");
                entry.data = stream.readUint8Array(entry.description_length);
                stream.position -= entry.description_length;
              }
              entry.parse(stream);
            }
          });
          BoxParser.createFullBoxCtor("sidx", function(stream) {
            this.reference_ID = stream.readUint32();
            this.timescale = stream.readUint32();
            if (this.version === 0) {
              this.earliest_presentation_time = stream.readUint32();
              this.first_offset = stream.readUint32();
            } else {
              this.earliest_presentation_time = stream.readUint64();
              this.first_offset = stream.readUint64();
            }
            stream.readUint16();
            this.references = [];
            var count = stream.readUint16();
            for (var i2 = 0; i2 < count; i2++) {
              var ref2 = {};
              this.references.push(ref2);
              var tmp_32 = stream.readUint32();
              ref2.reference_type = tmp_32 >> 31 & 1;
              ref2.referenced_size = tmp_32 & 2147483647;
              ref2.subsegment_duration = stream.readUint32();
              tmp_32 = stream.readUint32();
              ref2.starts_with_SAP = tmp_32 >> 31 & 1;
              ref2.SAP_type = tmp_32 >> 28 & 7;
              ref2.SAP_delta_time = tmp_32 & 268435455;
            }
          });
          BoxParser.SingleItemTypeReferenceBox = function(type, size, hdr_size, start) {
            BoxParser.Box.call(this, type, size);
            this.hdr_size = hdr_size;
            this.start = start;
          };
          BoxParser.SingleItemTypeReferenceBox.prototype = new BoxParser.Box();
          BoxParser.SingleItemTypeReferenceBox.prototype.parse = function(stream) {
            this.from_item_ID = stream.readUint16();
            var count = stream.readUint16();
            this.references = [];
            for (var i2 = 0; i2 < count; i2++) {
              this.references[i2] = {};
              this.references[i2].to_item_ID = stream.readUint16();
            }
          };
          BoxParser.SingleItemTypeReferenceBoxLarge = function(type, size, hdr_size, start) {
            BoxParser.Box.call(this, type, size);
            this.hdr_size = hdr_size;
            this.start = start;
          };
          BoxParser.SingleItemTypeReferenceBoxLarge.prototype = new BoxParser.Box();
          BoxParser.SingleItemTypeReferenceBoxLarge.prototype.parse = function(stream) {
            this.from_item_ID = stream.readUint32();
            var count = stream.readUint16();
            this.references = [];
            for (var i2 = 0; i2 < count; i2++) {
              this.references[i2] = {};
              this.references[i2].to_item_ID = stream.readUint32();
            }
          };
          BoxParser.createFullBoxCtor("SmDm", function(stream) {
            this.primaryRChromaticity_x = stream.readUint16();
            this.primaryRChromaticity_y = stream.readUint16();
            this.primaryGChromaticity_x = stream.readUint16();
            this.primaryGChromaticity_y = stream.readUint16();
            this.primaryBChromaticity_x = stream.readUint16();
            this.primaryBChromaticity_y = stream.readUint16();
            this.whitePointChromaticity_x = stream.readUint16();
            this.whitePointChromaticity_y = stream.readUint16();
            this.luminanceMax = stream.readUint32();
            this.luminanceMin = stream.readUint32();
          });
          BoxParser.createFullBoxCtor("smhd", function(stream) {
            this.balance = stream.readUint16();
            stream.readUint16();
          });
          BoxParser.createFullBoxCtor("ssix", function(stream) {
            this.subsegments = [];
            var subsegment_count = stream.readUint32();
            for (var i2 = 0; i2 < subsegment_count; i2++) {
              var subsegment = {};
              this.subsegments.push(subsegment);
              subsegment.ranges = [];
              var range_count = stream.readUint32();
              for (var j = 0; j < range_count; j++) {
                var range = {};
                subsegment.ranges.push(range);
                range.level = stream.readUint8();
                range.range_size = stream.readUint24();
              }
            }
          });
          BoxParser.createFullBoxCtor("stco", function(stream) {
            var entry_count2;
            entry_count2 = stream.readUint32();
            this.chunk_offsets = [];
            if (this.version === 0) {
              for (var i2 = 0; i2 < entry_count2; i2++) {
                this.chunk_offsets.push(stream.readUint32());
              }
            }
          });
          BoxParser.createFullBoxCtor("stdp", function(stream) {
            var count = (this.size - this.hdr_size) / 2;
            this.priority = [];
            for (var i2 = 0; i2 < count; i2++) {
              this.priority[i2] = stream.readUint16();
            }
          });
          BoxParser.createFullBoxCtor("sthd");
          BoxParser.createFullBoxCtor("stri", function(stream) {
            this.switch_group = stream.readUint16();
            this.alternate_group = stream.readUint16();
            this.sub_track_id = stream.readUint32();
            var count = (this.size - this.hdr_size - 8) / 4;
            this.attribute_list = [];
            for (var i2 = 0; i2 < count; i2++) {
              this.attribute_list[i2] = stream.readUint32();
            }
          });
          BoxParser.createFullBoxCtor("stsc", function(stream) {
            var entry_count2;
            var i2;
            entry_count2 = stream.readUint32();
            this.first_chunk = [];
            this.samples_per_chunk = [];
            this.sample_description_index = [];
            if (this.version === 0) {
              for (i2 = 0; i2 < entry_count2; i2++) {
                this.first_chunk.push(stream.readUint32());
                this.samples_per_chunk.push(stream.readUint32());
                this.sample_description_index.push(stream.readUint32());
              }
            }
          });
          BoxParser.createFullBoxCtor("stsd", function(stream) {
            var i2;
            var ret2;
            var entryCount;
            var box2;
            this.entries = [];
            entryCount = stream.readUint32();
            for (i2 = 1; i2 <= entryCount; i2++) {
              ret2 = BoxParser.parseOneBox(stream, true, this.size - (stream.getPosition() - this.start));
              if (ret2.code === BoxParser.OK) {
                if (BoxParser[ret2.type + "SampleEntry"]) {
                  box2 = new BoxParser[ret2.type + "SampleEntry"](ret2.size);
                  box2.hdr_size = ret2.hdr_size;
                  box2.start = ret2.start;
                } else {
                  Log.warn("BoxParser", "Unknown sample entry type: " + ret2.type);
                  box2 = new BoxParser.SampleEntry(ret2.type, ret2.size, ret2.hdr_size, ret2.start);
                }
                if (box2.write === BoxParser.SampleEntry.prototype.write) {
                  Log.info("BoxParser", "SampleEntry " + box2.type + " box writing not yet implemented, keeping unparsed data in memory for later write");
                  box2.parseDataAndRewind(stream);
                }
                box2.parse(stream);
                this.entries.push(box2);
              } else {
                return;
              }
            }
          });
          BoxParser.createFullBoxCtor("stsg", function(stream) {
            this.grouping_type = stream.readUint32();
            var count = stream.readUint16();
            this.group_description_index = [];
            for (var i2 = 0; i2 < count; i2++) {
              this.group_description_index[i2] = stream.readUint32();
            }
          });
          BoxParser.createFullBoxCtor("stsh", function(stream) {
            var entry_count2;
            var i2;
            entry_count2 = stream.readUint32();
            this.shadowed_sample_numbers = [];
            this.sync_sample_numbers = [];
            if (this.version === 0) {
              for (i2 = 0; i2 < entry_count2; i2++) {
                this.shadowed_sample_numbers.push(stream.readUint32());
                this.sync_sample_numbers.push(stream.readUint32());
              }
            }
          });
          BoxParser.createFullBoxCtor("stss", function(stream) {
            var i2;
            var entry_count2;
            entry_count2 = stream.readUint32();
            if (this.version === 0) {
              this.sample_numbers = [];
              for (i2 = 0; i2 < entry_count2; i2++) {
                this.sample_numbers.push(stream.readUint32());
              }
            }
          });
          BoxParser.createFullBoxCtor("stsz", function(stream) {
            var i2;
            this.sample_sizes = [];
            if (this.version === 0) {
              this.sample_size = stream.readUint32();
              this.sample_count = stream.readUint32();
              for (i2 = 0; i2 < this.sample_count; i2++) {
                if (this.sample_size === 0) {
                  this.sample_sizes.push(stream.readUint32());
                } else {
                  this.sample_sizes[i2] = this.sample_size;
                }
              }
            }
          });
          BoxParser.createFullBoxCtor("stts", function(stream) {
            var entry_count2;
            var i2;
            var delta;
            entry_count2 = stream.readUint32();
            this.sample_counts = [];
            this.sample_deltas = [];
            if (this.version === 0) {
              for (i2 = 0; i2 < entry_count2; i2++) {
                this.sample_counts.push(stream.readUint32());
                delta = stream.readInt32();
                if (delta < 0) {
                  Log.warn("BoxParser", "File uses negative stts sample delta, using value 1 instead, sync may be lost!");
                  delta = 1;
                }
                this.sample_deltas.push(delta);
              }
            }
          });
          BoxParser.createFullBoxCtor("stvi", function(stream) {
            var tmp32 = stream.readUint32();
            this.single_view_allowed = tmp32 & 3;
            this.stereo_scheme = stream.readUint32();
            var length = stream.readUint32();
            this.stereo_indication_type = stream.readString(length);
            var ret2;
            var box2;
            this.boxes = [];
            while (stream.getPosition() < this.start + this.size) {
              ret2 = BoxParser.parseOneBox(stream, false, this.size - (stream.getPosition() - this.start));
              if (ret2.code === BoxParser.OK) {
                box2 = ret2.box;
                this.boxes.push(box2);
                this[box2.type] = box2;
              } else {
                return;
              }
            }
          });
          BoxParser.createBoxCtor("styp", function(stream) {
            BoxParser.ftypBox.prototype.parse.call(this, stream);
          });
          BoxParser.createFullBoxCtor("stz2", function(stream) {
            var i2;
            var sample_count;
            this.sample_sizes = [];
            if (this.version === 0) {
              this.reserved = stream.readUint24();
              this.field_size = stream.readUint8();
              sample_count = stream.readUint32();
              if (this.field_size === 4) {
                for (i2 = 0; i2 < sample_count; i2 += 2) {
                  var tmp = stream.readUint8();
                  this.sample_sizes[i2] = tmp >> 4 & 15;
                  this.sample_sizes[i2 + 1] = tmp & 15;
                }
              } else if (this.field_size === 8) {
                for (i2 = 0; i2 < sample_count; i2++) {
                  this.sample_sizes[i2] = stream.readUint8();
                }
              } else if (this.field_size === 16) {
                for (i2 = 0; i2 < sample_count; i2++) {
                  this.sample_sizes[i2] = stream.readUint16();
                }
              } else {
                Log.error("BoxParser", "Error in length field in stz2 box");
              }
            }
          });
          BoxParser.createFullBoxCtor("subs", function(stream) {
            var i2, j;
            var entry_count2;
            var subsample_count;
            entry_count2 = stream.readUint32();
            this.entries = [];
            for (i2 = 0; i2 < entry_count2; i2++) {
              var sampleInfo = {};
              this.entries[i2] = sampleInfo;
              sampleInfo.sample_delta = stream.readUint32();
              sampleInfo.subsamples = [];
              subsample_count = stream.readUint16();
              if (subsample_count > 0) {
                for (j = 0; j < subsample_count; j++) {
                  var subsample = {};
                  sampleInfo.subsamples.push(subsample);
                  if (this.version == 1) {
                    subsample.size = stream.readUint32();
                  } else {
                    subsample.size = stream.readUint16();
                  }
                  subsample.priority = stream.readUint8();
                  subsample.discardable = stream.readUint8();
                  subsample.codec_specific_parameters = stream.readUint32();
                }
              }
            }
          });
          BoxParser.createFullBoxCtor("tenc", function(stream) {
            stream.readUint8();
            if (this.version === 0) {
              stream.readUint8();
            } else {
              var tmp = stream.readUint8();
              this.default_crypt_byte_block = tmp >> 4 & 15;
              this.default_skip_byte_block = tmp & 15;
            }
            this.default_isProtected = stream.readUint8();
            this.default_Per_Sample_IV_Size = stream.readUint8();
            this.default_KID = BoxParser.parseHex16(stream);
            if (this.default_isProtected === 1 && this.default_Per_Sample_IV_Size === 0) {
              this.default_constant_IV_size = stream.readUint8();
              this.default_constant_IV = stream.readUint8Array(this.default_constant_IV_size);
            }
          });
          BoxParser.createFullBoxCtor("tfdt", function(stream) {
            if (this.version == 1) {
              this.baseMediaDecodeTime = stream.readUint64();
            } else {
              this.baseMediaDecodeTime = stream.readUint32();
            }
          });
          BoxParser.createFullBoxCtor("tfhd", function(stream) {
            var readBytes = 0;
            this.track_id = stream.readUint32();
            if (this.size - this.hdr_size > readBytes && this.flags & BoxParser.TFHD_FLAG_BASE_DATA_OFFSET) {
              this.base_data_offset = stream.readUint64();
              readBytes += 8;
            } else {
              this.base_data_offset = 0;
            }
            if (this.size - this.hdr_size > readBytes && this.flags & BoxParser.TFHD_FLAG_SAMPLE_DESC) {
              this.default_sample_description_index = stream.readUint32();
              readBytes += 4;
            } else {
              this.default_sample_description_index = 0;
            }
            if (this.size - this.hdr_size > readBytes && this.flags & BoxParser.TFHD_FLAG_SAMPLE_DUR) {
              this.default_sample_duration = stream.readUint32();
              readBytes += 4;
            } else {
              this.default_sample_duration = 0;
            }
            if (this.size - this.hdr_size > readBytes && this.flags & BoxParser.TFHD_FLAG_SAMPLE_SIZE) {
              this.default_sample_size = stream.readUint32();
              readBytes += 4;
            } else {
              this.default_sample_size = 0;
            }
            if (this.size - this.hdr_size > readBytes && this.flags & BoxParser.TFHD_FLAG_SAMPLE_FLAGS) {
              this.default_sample_flags = stream.readUint32();
              readBytes += 4;
            } else {
              this.default_sample_flags = 0;
            }
          });
          BoxParser.createFullBoxCtor("tfra", function(stream) {
            this.track_ID = stream.readUint32();
            stream.readUint24();
            var tmp_byte = stream.readUint8();
            this.length_size_of_traf_num = tmp_byte >> 4 & 3;
            this.length_size_of_trun_num = tmp_byte >> 2 & 3;
            this.length_size_of_sample_num = tmp_byte & 3;
            this.entries = [];
            var number_of_entries = stream.readUint32();
            for (var i2 = 0; i2 < number_of_entries; i2++) {
              if (this.version === 1) {
                this.time = stream.readUint64();
                this.moof_offset = stream.readUint64();
              } else {
                this.time = stream.readUint32();
                this.moof_offset = stream.readUint32();
              }
              this.traf_number = stream["readUint" + 8 * (this.length_size_of_traf_num + 1)]();
              this.trun_number = stream["readUint" + 8 * (this.length_size_of_trun_num + 1)]();
              this.sample_number = stream["readUint" + 8 * (this.length_size_of_sample_num + 1)]();
            }
          });
          BoxParser.createFullBoxCtor("tkhd", function(stream) {
            if (this.version == 1) {
              this.creation_time = stream.readUint64();
              this.modification_time = stream.readUint64();
              this.track_id = stream.readUint32();
              stream.readUint32();
              this.duration = stream.readUint64();
            } else {
              this.creation_time = stream.readUint32();
              this.modification_time = stream.readUint32();
              this.track_id = stream.readUint32();
              stream.readUint32();
              this.duration = stream.readUint32();
            }
            stream.readUint32Array(2);
            this.layer = stream.readInt16();
            this.alternate_group = stream.readInt16();
            this.volume = stream.readInt16() >> 8;
            stream.readUint16();
            this.matrix = stream.readInt32Array(9);
            this.width = stream.readUint32();
            this.height = stream.readUint32();
          });
          BoxParser.createBoxCtor("tmax", function(stream) {
            this.time = stream.readUint32();
          });
          BoxParser.createBoxCtor("tmin", function(stream) {
            this.time = stream.readUint32();
          });
          BoxParser.createBoxCtor("totl", function(stream) {
            this.bytessent = stream.readUint32();
          });
          BoxParser.createBoxCtor("tpay", function(stream) {
            this.bytessent = stream.readUint32();
          });
          BoxParser.createBoxCtor("tpyl", function(stream) {
            this.bytessent = stream.readUint64();
          });
          BoxParser.TrackGroupTypeBox.prototype.parse = function(stream) {
            this.parseFullHeader(stream);
            this.track_group_id = stream.readUint32();
          };
          BoxParser.createTrackGroupCtor("msrc");
          BoxParser.TrackReferenceTypeBox = function(type, size, hdr_size, start) {
            BoxParser.Box.call(this, type, size);
            this.hdr_size = hdr_size;
            this.start = start;
          };
          BoxParser.TrackReferenceTypeBox.prototype = new BoxParser.Box();
          BoxParser.TrackReferenceTypeBox.prototype.parse = function(stream) {
            this.track_ids = stream.readUint32Array((this.size - this.hdr_size) / 4);
          };
          BoxParser.trefBox.prototype.parse = function(stream) {
            var ret2;
            var box2;
            while (stream.getPosition() < this.start + this.size) {
              ret2 = BoxParser.parseOneBox(stream, true, this.size - (stream.getPosition() - this.start));
              if (ret2.code === BoxParser.OK) {
                box2 = new BoxParser.TrackReferenceTypeBox(ret2.type, ret2.size, ret2.hdr_size, ret2.start);
                if (box2.write === BoxParser.Box.prototype.write && box2.type !== "mdat") {
                  Log.info("BoxParser", "TrackReference " + box2.type + " box writing not yet implemented, keeping unparsed data in memory for later write");
                  box2.parseDataAndRewind(stream);
                }
                box2.parse(stream);
                this.boxes.push(box2);
              } else {
                return;
              }
            }
          };
          BoxParser.createFullBoxCtor("trep", function(stream) {
            this.track_ID = stream.readUint32();
            this.boxes = [];
            while (stream.getPosition() < this.start + this.size) {
              ret = BoxParser.parseOneBox(stream, false, this.size - (stream.getPosition() - this.start));
              if (ret.code === BoxParser.OK) {
                box = ret.box;
                this.boxes.push(box);
              } else {
                return;
              }
            }
          });
          BoxParser.createFullBoxCtor("trex", function(stream) {
            this.track_id = stream.readUint32();
            this.default_sample_description_index = stream.readUint32();
            this.default_sample_duration = stream.readUint32();
            this.default_sample_size = stream.readUint32();
            this.default_sample_flags = stream.readUint32();
          });
          BoxParser.createBoxCtor("trpy", function(stream) {
            this.bytessent = stream.readUint64();
          });
          BoxParser.createFullBoxCtor("trun", function(stream) {
            var readBytes = 0;
            this.sample_count = stream.readUint32();
            readBytes += 4;
            if (this.size - this.hdr_size > readBytes && this.flags & BoxParser.TRUN_FLAGS_DATA_OFFSET) {
              this.data_offset = stream.readInt32();
              readBytes += 4;
            } else {
              this.data_offset = 0;
            }
            if (this.size - this.hdr_size > readBytes && this.flags & BoxParser.TRUN_FLAGS_FIRST_FLAG) {
              this.first_sample_flags = stream.readUint32();
              readBytes += 4;
            } else {
              this.first_sample_flags = 0;
            }
            this.sample_duration = [];
            this.sample_size = [];
            this.sample_flags = [];
            this.sample_composition_time_offset = [];
            if (this.size - this.hdr_size > readBytes) {
              for (var i2 = 0; i2 < this.sample_count; i2++) {
                if (this.flags & BoxParser.TRUN_FLAGS_DURATION) {
                  this.sample_duration[i2] = stream.readUint32();
                }
                if (this.flags & BoxParser.TRUN_FLAGS_SIZE) {
                  this.sample_size[i2] = stream.readUint32();
                }
                if (this.flags & BoxParser.TRUN_FLAGS_FLAGS) {
                  this.sample_flags[i2] = stream.readUint32();
                }
                if (this.flags & BoxParser.TRUN_FLAGS_CTS_OFFSET) {
                  if (this.version === 0) {
                    this.sample_composition_time_offset[i2] = stream.readUint32();
                  } else {
                    this.sample_composition_time_offset[i2] = stream.readInt32();
                  }
                }
              }
            }
          });
          BoxParser.createFullBoxCtor("tsel", function(stream) {
            this.switch_group = stream.readUint32();
            var count = (this.size - this.hdr_size - 4) / 4;
            this.attribute_list = [];
            for (var i2 = 0; i2 < count; i2++) {
              this.attribute_list[i2] = stream.readUint32();
            }
          });
          BoxParser.createFullBoxCtor("txtC", function(stream) {
            this.config = stream.readCString();
          });
          BoxParser.createBoxCtor("tyco", function(stream) {
            var count = (this.size - this.hdr_size) / 4;
            this.compatible_brands = [];
            for (var i2 = 0; i2 < count; i2++) {
              this.compatible_brands[i2] = stream.readString(4);
            }
          });
          BoxParser.createFullBoxCtor("udes", function(stream) {
            this.lang = stream.readCString();
            this.name = stream.readCString();
            this.description = stream.readCString();
            this.tags = stream.readCString();
          });
          BoxParser.createFullBoxCtor("uncC", function(stream) {
            var i2;
            this.profile = stream.readUint32();
            if (this.version == 1) ;
            else if (this.version == 0) {
              this.component_count = stream.readUint32();
              this.component_index = [];
              this.component_bit_depth_minus_one = [];
              this.component_format = [];
              this.component_align_size = [];
              for (i2 = 0; i2 < this.component_count; i2++) {
                this.component_index.push(stream.readUint16());
                this.component_bit_depth_minus_one.push(stream.readUint8());
                this.component_format.push(stream.readUint8());
                this.component_align_size.push(stream.readUint8());
              }
              this.sampling_type = stream.readUint8();
              this.interleave_type = stream.readUint8();
              this.block_size = stream.readUint8();
              var flags = stream.readUint8();
              this.component_little_endian = flags >> 7 & 1;
              this.block_pad_lsb = flags >> 6 & 1;
              this.block_little_endian = flags >> 5 & 1;
              this.block_reversed = flags >> 4 & 1;
              this.pad_unknown = flags >> 3 & 1;
              this.pixel_size = stream.readUint32();
              this.row_align_size = stream.readUint32();
              this.tile_align_size = stream.readUint32();
              this.num_tile_cols_minus_one = stream.readUint32();
              this.num_tile_rows_minus_one = stream.readUint32();
            }
          });
          BoxParser.createFullBoxCtor("url ", function(stream) {
            if (this.flags !== 1) {
              this.location = stream.readCString();
            }
          });
          BoxParser.createFullBoxCtor("urn ", function(stream) {
            this.name = stream.readCString();
            if (this.size - this.hdr_size - this.name.length - 1 > 0) {
              this.location = stream.readCString();
            }
          });
          BoxParser.createUUIDBox("a5d40b30e81411ddba2f0800200c9a66", true, false, function(stream) {
            this.LiveServerManifest = stream.readString(this.size - this.hdr_size).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
          });
          BoxParser.createUUIDBox("d08a4f1810f34a82b6c832d8aba183d3", true, false, function(stream) {
            this.system_id = BoxParser.parseHex16(stream);
            var datasize = stream.readUint32();
            if (datasize > 0) {
              this.data = stream.readUint8Array(datasize);
            }
          });
          BoxParser.createUUIDBox(
            "a2394f525a9b4f14a2446c427c648df4",
            true,
            false
            /*, function(stream) {
            	if (this.flags & 0x1) {
            		this.AlgorithmID = stream.readUint24();
            		this.IV_size = stream.readUint8();
            		this.KID = BoxParser.parseHex16(stream);
            	}
            	var sample_count = stream.readUint32();
            	this.samples = [];
            	for (var i = 0; i < sample_count; i++) {
            		var sample = {};
            		sample.InitializationVector = this.readUint8Array(this.IV_size*8);
            		if (this.flags & 0x2) {
            			sample.subsamples = [];
            			sample.NumberOfEntries = stream.readUint16();
            			for (var j = 0; j < sample.NumberOfEntries; j++) {
            				var subsample = {};
            				subsample.BytesOfClearData = stream.readUint16();
            				subsample.BytesOfProtectedData = stream.readUint32();
            				sample.subsamples.push(subsample);
            			}
            		}
            		this.samples.push(sample);
            	}
            }*/
          );
          BoxParser.createUUIDBox("8974dbce7be74c5184f97148f9882554", true, false, function(stream) {
            this.default_AlgorithmID = stream.readUint24();
            this.default_IV_size = stream.readUint8();
            this.default_KID = BoxParser.parseHex16(stream);
          });
          BoxParser.createUUIDBox("d4807ef2ca3946958e5426cb9e46a79f", true, false, function(stream) {
            this.fragment_count = stream.readUint8();
            this.entries = [];
            for (var i2 = 0; i2 < this.fragment_count; i2++) {
              var entry = {};
              var absolute_time = 0;
              var absolute_duration = 0;
              if (this.version === 1) {
                absolute_time = stream.readUint64();
                absolute_duration = stream.readUint64();
              } else {
                absolute_time = stream.readUint32();
                absolute_duration = stream.readUint32();
              }
              entry.absolute_time = absolute_time;
              entry.absolute_duration = absolute_duration;
              this.entries.push(entry);
            }
          });
          BoxParser.createUUIDBox("6d1d9b0542d544e680e2141daff757b2", true, false, function(stream) {
            if (this.version === 1) {
              this.absolute_time = stream.readUint64();
              this.duration = stream.readUint64();
            } else {
              this.absolute_time = stream.readUint32();
              this.duration = stream.readUint32();
            }
          });
          BoxParser.createFullBoxCtor("vmhd", function(stream) {
            this.graphicsmode = stream.readUint16();
            this.opcolor = stream.readUint16Array(3);
          });
          BoxParser.createFullBoxCtor("vpcC", function(stream) {
            var tmp;
            if (this.version === 1) {
              this.profile = stream.readUint8();
              this.level = stream.readUint8();
              tmp = stream.readUint8();
              this.bitDepth = tmp >> 4;
              this.chromaSubsampling = tmp >> 1 & 7;
              this.videoFullRangeFlag = tmp & 1;
              this.colourPrimaries = stream.readUint8();
              this.transferCharacteristics = stream.readUint8();
              this.matrixCoefficients = stream.readUint8();
              this.codecIntializationDataSize = stream.readUint16();
              this.codecIntializationData = stream.readUint8Array(this.codecIntializationDataSize);
            } else {
              this.profile = stream.readUint8();
              this.level = stream.readUint8();
              tmp = stream.readUint8();
              this.bitDepth = tmp >> 4 & 15;
              this.colorSpace = tmp & 15;
              tmp = stream.readUint8();
              this.chromaSubsampling = tmp >> 4 & 15;
              this.transferFunction = tmp >> 1 & 7;
              this.videoFullRangeFlag = tmp & 1;
              this.codecIntializationDataSize = stream.readUint16();
              this.codecIntializationData = stream.readUint8Array(this.codecIntializationDataSize);
            }
          });
          BoxParser.createBoxCtor("vttC", function(stream) {
            this.text = stream.readString(this.size - this.hdr_size);
          });
          BoxParser.createFullBoxCtor("vvcC", function(stream) {
            var i2, j;
            var bitReader = {
              held_bits: undefined,
              num_held_bits: 0,
              stream_read_1_bytes: function(strm2) {
                this.held_bits = strm2.readUint8();
                this.num_held_bits = 1 * 8;
              },
              stream_read_2_bytes: function(strm2) {
                this.held_bits = strm2.readUint16();
                this.num_held_bits = 2 * 8;
              },
              extract_bits: function(num_bits) {
                var ret2 = this.held_bits >> this.num_held_bits - num_bits & (1 << num_bits) - 1;
                this.num_held_bits -= num_bits;
                return ret2;
              }
            };
            bitReader.stream_read_1_bytes(stream);
            bitReader.extract_bits(5);
            this.lengthSizeMinusOne = bitReader.extract_bits(2);
            this.ptl_present_flag = bitReader.extract_bits(1);
            if (this.ptl_present_flag) {
              bitReader.stream_read_2_bytes(stream);
              this.ols_idx = bitReader.extract_bits(9);
              this.num_sublayers = bitReader.extract_bits(3);
              this.constant_frame_rate = bitReader.extract_bits(2);
              this.chroma_format_idc = bitReader.extract_bits(2);
              bitReader.stream_read_1_bytes(stream);
              this.bit_depth_minus8 = bitReader.extract_bits(3);
              bitReader.extract_bits(5);
              {
                bitReader.stream_read_2_bytes(stream);
                bitReader.extract_bits(2);
                this.num_bytes_constraint_info = bitReader.extract_bits(6);
                this.general_profile_idc = bitReader.extract_bits(7);
                this.general_tier_flag = bitReader.extract_bits(1);
                this.general_level_idc = stream.readUint8();
                bitReader.stream_read_1_bytes(stream);
                this.ptl_frame_only_constraint_flag = bitReader.extract_bits(1);
                this.ptl_multilayer_enabled_flag = bitReader.extract_bits(1);
                this.general_constraint_info = new Uint8Array(this.num_bytes_constraint_info);
                if (this.num_bytes_constraint_info) {
                  for (i2 = 0; i2 < this.num_bytes_constraint_info - 1; i2++) {
                    var cnstr1 = bitReader.extract_bits(6);
                    bitReader.stream_read_1_bytes(stream);
                    var cnstr2 = bitReader.extract_bits(2);
                    this.general_constraint_info[i2] = cnstr1 << 2 | cnstr2;
                  }
                  this.general_constraint_info[this.num_bytes_constraint_info - 1] = bitReader.extract_bits(6);
                } else {
                  bitReader.extract_bits(6);
                }
                if (this.num_sublayers > 1) {
                  bitReader.stream_read_1_bytes(stream);
                  this.ptl_sublayer_present_mask = 0;
                  for (j = this.num_sublayers - 2; j >= 0; --j) {
                    var val = bitReader.extract_bits(1);
                    this.ptl_sublayer_present_mask |= val << j;
                  }
                  for (j = this.num_sublayers; j <= 8 && this.num_sublayers > 1; ++j) {
                    bitReader.extract_bits(1);
                  }
                  this.sublayer_level_idc = [];
                  for (j = this.num_sublayers - 2; j >= 0; --j) {
                    if (this.ptl_sublayer_present_mask & 1 << j) {
                      this.sublayer_level_idc[j] = stream.readUint8();
                    }
                  }
                }
                this.ptl_num_sub_profiles = stream.readUint8();
                this.general_sub_profile_idc = [];
                if (this.ptl_num_sub_profiles) {
                  for (i2 = 0; i2 < this.ptl_num_sub_profiles; i2++) {
                    this.general_sub_profile_idc.push(stream.readUint32());
                  }
                }
              }
              this.max_picture_width = stream.readUint16();
              this.max_picture_height = stream.readUint16();
              this.avg_frame_rate = stream.readUint16();
            }
            var VVC_NALU_OPI = 12;
            var VVC_NALU_DEC_PARAM = 13;
            this.nalu_arrays = [];
            var num_of_arrays = stream.readUint8();
            for (i2 = 0; i2 < num_of_arrays; i2++) {
              var nalu_array = [];
              this.nalu_arrays.push(nalu_array);
              bitReader.stream_read_1_bytes(stream);
              nalu_array.completeness = bitReader.extract_bits(1);
              bitReader.extract_bits(2);
              nalu_array.nalu_type = bitReader.extract_bits(5);
              var numNalus = 1;
              if (nalu_array.nalu_type != VVC_NALU_DEC_PARAM && nalu_array.nalu_type != VVC_NALU_OPI) {
                numNalus = stream.readUint16();
              }
              for (j = 0; j < numNalus; j++) {
                var len = stream.readUint16();
                nalu_array.push({
                  data: stream.readUint8Array(len),
                  length: len
                });
              }
            }
          });
          BoxParser.createFullBoxCtor("vvnC", function(stream) {
            var tmp = strm.readUint8();
            this.lengthSizeMinusOne = tmp & 3;
          });
          BoxParser.SampleEntry.prototype.isVideo = function() {
            return false;
          };
          BoxParser.SampleEntry.prototype.isAudio = function() {
            return false;
          };
          BoxParser.SampleEntry.prototype.isSubtitle = function() {
            return false;
          };
          BoxParser.SampleEntry.prototype.isMetadata = function() {
            return false;
          };
          BoxParser.SampleEntry.prototype.isHint = function() {
            return false;
          };
          BoxParser.SampleEntry.prototype.getCodec = function() {
            return this.type.replace(".", "");
          };
          BoxParser.SampleEntry.prototype.getWidth = function() {
            return "";
          };
          BoxParser.SampleEntry.prototype.getHeight = function() {
            return "";
          };
          BoxParser.SampleEntry.prototype.getChannelCount = function() {
            return "";
          };
          BoxParser.SampleEntry.prototype.getSampleRate = function() {
            return "";
          };
          BoxParser.SampleEntry.prototype.getSampleSize = function() {
            return "";
          };
          BoxParser.VisualSampleEntry.prototype.isVideo = function() {
            return true;
          };
          BoxParser.VisualSampleEntry.prototype.getWidth = function() {
            return this.width;
          };
          BoxParser.VisualSampleEntry.prototype.getHeight = function() {
            return this.height;
          };
          BoxParser.AudioSampleEntry.prototype.isAudio = function() {
            return true;
          };
          BoxParser.AudioSampleEntry.prototype.getChannelCount = function() {
            return this.channel_count;
          };
          BoxParser.AudioSampleEntry.prototype.getSampleRate = function() {
            return this.samplerate;
          };
          BoxParser.AudioSampleEntry.prototype.getSampleSize = function() {
            return this.samplesize;
          };
          BoxParser.SubtitleSampleEntry.prototype.isSubtitle = function() {
            return true;
          };
          BoxParser.MetadataSampleEntry.prototype.isMetadata = function() {
            return true;
          };
          BoxParser.decimalToHex = function(d, padding) {
            var hex = Number(d).toString(16);
            padding = typeof padding === "undefined" || padding === null ? padding = 2 : padding;
            while (hex.length < padding) {
              hex = "0" + hex;
            }
            return hex;
          };
          BoxParser.avc1SampleEntry.prototype.getCodec = BoxParser.avc2SampleEntry.prototype.getCodec = BoxParser.avc3SampleEntry.prototype.getCodec = BoxParser.avc4SampleEntry.prototype.getCodec = function() {
            var baseCodec = BoxParser.SampleEntry.prototype.getCodec.call(this);
            if (this.avcC) {
              return baseCodec + "." + BoxParser.decimalToHex(this.avcC.AVCProfileIndication) + BoxParser.decimalToHex(this.avcC.profile_compatibility) + BoxParser.decimalToHex(this.avcC.AVCLevelIndication);
            } else {
              return baseCodec;
            }
          };
          BoxParser.hev1SampleEntry.prototype.getCodec = BoxParser.hvc1SampleEntry.prototype.getCodec = function() {
            var i2;
            var baseCodec = BoxParser.SampleEntry.prototype.getCodec.call(this);
            if (this.hvcC) {
              baseCodec += ".";
              switch (this.hvcC.general_profile_space) {
                case 0:
                  baseCodec += "";
                  break;
                case 1:
                  baseCodec += "A";
                  break;
                case 2:
                  baseCodec += "B";
                  break;
                case 3:
                  baseCodec += "C";
                  break;
              }
              baseCodec += this.hvcC.general_profile_idc;
              baseCodec += ".";
              var val = this.hvcC.general_profile_compatibility;
              var reversed = 0;
              for (i2 = 0; i2 < 32; i2++) {
                reversed |= val & 1;
                if (i2 == 31) break;
                reversed <<= 1;
                val >>= 1;
              }
              baseCodec += BoxParser.decimalToHex(reversed, 0);
              baseCodec += ".";
              if (this.hvcC.general_tier_flag === 0) {
                baseCodec += "L";
              } else {
                baseCodec += "H";
              }
              baseCodec += this.hvcC.general_level_idc;
              var hasByte = false;
              var constraint_string = "";
              for (i2 = 5; i2 >= 0; i2--) {
                if (this.hvcC.general_constraint_indicator[i2] || hasByte) {
                  constraint_string = "." + BoxParser.decimalToHex(this.hvcC.general_constraint_indicator[i2], 0) + constraint_string;
                  hasByte = true;
                }
              }
              baseCodec += constraint_string;
            }
            return baseCodec;
          };
          BoxParser.vvc1SampleEntry.prototype.getCodec = BoxParser.vvi1SampleEntry.prototype.getCodec = function() {
            var i2;
            var baseCodec = BoxParser.SampleEntry.prototype.getCodec.call(this);
            if (this.vvcC) {
              baseCodec += "." + this.vvcC.general_profile_idc;
              if (this.vvcC.general_tier_flag) {
                baseCodec += ".H";
              } else {
                baseCodec += ".L";
              }
              baseCodec += this.vvcC.general_level_idc;
              var constraint_string = "";
              if (this.vvcC.general_constraint_info) {
                var bytes = [];
                var byte = 0;
                byte |= this.vvcC.ptl_frame_only_constraint << 7;
                byte |= this.vvcC.ptl_multilayer_enabled << 6;
                var last_nonzero;
                for (i2 = 0; i2 < this.vvcC.general_constraint_info.length; ++i2) {
                  byte |= this.vvcC.general_constraint_info[i2] >> 2 & 63;
                  bytes.push(byte);
                  if (byte) {
                    last_nonzero = i2;
                  }
                  byte = this.vvcC.general_constraint_info[i2] >> 2 & 3;
                }
                if (last_nonzero === undefined) {
                  constraint_string = ".CA";
                } else {
                  constraint_string = ".C";
                  var base32_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
                  var held_bits = 0;
                  var num_held_bits = 0;
                  for (i2 = 0; i2 <= last_nonzero; ++i2) {
                    held_bits = held_bits << 8 | bytes[i2];
                    num_held_bits += 8;
                    while (num_held_bits >= 5) {
                      var val = held_bits >> num_held_bits - 5 & 31;
                      constraint_string += base32_chars[val];
                      num_held_bits -= 5;
                      held_bits &= (1 << num_held_bits) - 1;
                    }
                  }
                  if (num_held_bits) {
                    held_bits <<= 5 - num_held_bits;
                    constraint_string += base32_chars[held_bits & 31];
                  }
                }
              }
              baseCodec += constraint_string;
            }
            return baseCodec;
          };
          BoxParser.mp4aSampleEntry.prototype.getCodec = function() {
            var baseCodec = BoxParser.SampleEntry.prototype.getCodec.call(this);
            if (this.esds && this.esds.esd) {
              var oti = this.esds.esd.getOTI();
              var dsi = this.esds.esd.getAudioConfig();
              return baseCodec + "." + BoxParser.decimalToHex(oti) + (dsi ? "." + dsi : "");
            } else {
              return baseCodec;
            }
          };
          BoxParser.stxtSampleEntry.prototype.getCodec = function() {
            var baseCodec = BoxParser.SampleEntry.prototype.getCodec.call(this);
            if (this.mime_format) {
              return baseCodec + "." + this.mime_format;
            } else {
              return baseCodec;
            }
          };
          BoxParser.vp08SampleEntry.prototype.getCodec = BoxParser.vp09SampleEntry.prototype.getCodec = function() {
            var baseCodec = BoxParser.SampleEntry.prototype.getCodec.call(this);
            var level = this.vpcC.level;
            if (level == 0) {
              level = "00";
            }
            var bitDepth = this.vpcC.bitDepth;
            if (bitDepth == 8) {
              bitDepth = "08";
            }
            return baseCodec + ".0" + this.vpcC.profile + "." + level + "." + bitDepth;
          };
          BoxParser.av01SampleEntry.prototype.getCodec = function() {
            var baseCodec = BoxParser.SampleEntry.prototype.getCodec.call(this);
            var level = this.av1C.seq_level_idx_0;
            if (level < 10) {
              level = "0" + level;
            }
            var bitdepth;
            if (this.av1C.seq_profile === 2 && this.av1C.high_bitdepth === 1) {
              bitdepth = this.av1C.twelve_bit === 1 ? "12" : "10";
            } else if (this.av1C.seq_profile <= 2) {
              bitdepth = this.av1C.high_bitdepth === 1 ? "10" : "08";
            }
            return baseCodec + "." + this.av1C.seq_profile + "." + level + (this.av1C.seq_tier_0 ? "H" : "M") + "." + bitdepth;
          };
          BoxParser.Box.prototype.writeHeader = function(stream, msg) {
            this.size += 8;
            if (this.size > MAX_SIZE) {
              this.size += 8;
            }
            if (this.type === "uuid") {
              this.size += 16;
            }
            Log.debug("BoxWriter", "Writing box " + this.type + " of size: " + this.size + " at position " + stream.getPosition() + (msg || ""));
            if (this.size > MAX_SIZE) {
              stream.writeUint32(1);
            } else {
              this.sizePosition = stream.getPosition();
              stream.writeUint32(this.size);
            }
            stream.writeString(this.type, null, 4);
            if (this.type === "uuid") {
              stream.writeUint8Array(this.uuid);
            }
            if (this.size > MAX_SIZE) {
              stream.writeUint64(this.size);
            }
          };
          BoxParser.FullBox.prototype.writeHeader = function(stream) {
            this.size += 4;
            BoxParser.Box.prototype.writeHeader.call(this, stream, " v=" + this.version + " f=" + this.flags);
            stream.writeUint8(this.version);
            stream.writeUint24(this.flags);
          };
          BoxParser.Box.prototype.write = function(stream) {
            if (this.type === "mdat") {
              if (this.data) {
                this.size = this.data.length;
                this.writeHeader(stream);
                stream.writeUint8Array(this.data);
              }
            } else {
              this.size = this.data ? this.data.length : 0;
              this.writeHeader(stream);
              if (this.data) {
                stream.writeUint8Array(this.data);
              }
            }
          };
          BoxParser.ContainerBox.prototype.write = function(stream) {
            this.size = 0;
            this.writeHeader(stream);
            for (var i2 = 0; i2 < this.boxes.length; i2++) {
              if (this.boxes[i2]) {
                this.boxes[i2].write(stream);
                this.size += this.boxes[i2].size;
              }
            }
            Log.debug("BoxWriter", "Adjusting box " + this.type + " with new size " + this.size);
            stream.adjustUint32(this.sizePosition, this.size);
          };
          BoxParser.TrackReferenceTypeBox.prototype.write = function(stream) {
            this.size = this.track_ids.length * 4;
            this.writeHeader(stream);
            stream.writeUint32Array(this.track_ids);
          };
          BoxParser.avcCBox.prototype.write = function(stream) {
            var i2;
            this.size = 7;
            for (i2 = 0; i2 < this.SPS.length; i2++) {
              this.size += 2 + this.SPS[i2].length;
            }
            for (i2 = 0; i2 < this.PPS.length; i2++) {
              this.size += 2 + this.PPS[i2].length;
            }
            if (this.ext) {
              this.size += this.ext.length;
            }
            this.writeHeader(stream);
            stream.writeUint8(this.configurationVersion);
            stream.writeUint8(this.AVCProfileIndication);
            stream.writeUint8(this.profile_compatibility);
            stream.writeUint8(this.AVCLevelIndication);
            stream.writeUint8(this.lengthSizeMinusOne + (63 << 2));
            stream.writeUint8(this.SPS.length + (7 << 5));
            for (i2 = 0; i2 < this.SPS.length; i2++) {
              stream.writeUint16(this.SPS[i2].length);
              stream.writeUint8Array(this.SPS[i2].nalu);
            }
            stream.writeUint8(this.PPS.length);
            for (i2 = 0; i2 < this.PPS.length; i2++) {
              stream.writeUint16(this.PPS[i2].length);
              stream.writeUint8Array(this.PPS[i2].nalu);
            }
            if (this.ext) {
              stream.writeUint8Array(this.ext);
            }
          };
          BoxParser.co64Box.prototype.write = function(stream) {
            var i2;
            this.version = 0;
            this.flags = 0;
            this.size = 4 + 8 * this.chunk_offsets.length;
            this.writeHeader(stream);
            stream.writeUint32(this.chunk_offsets.length);
            for (i2 = 0; i2 < this.chunk_offsets.length; i2++) {
              stream.writeUint64(this.chunk_offsets[i2]);
            }
          };
          BoxParser.cslgBox.prototype.write = function(stream) {
            this.version = 0;
            this.flags = 0;
            this.size = 4 * 5;
            this.writeHeader(stream);
            stream.writeInt32(this.compositionToDTSShift);
            stream.writeInt32(this.leastDecodeToDisplayDelta);
            stream.writeInt32(this.greatestDecodeToDisplayDelta);
            stream.writeInt32(this.compositionStartTime);
            stream.writeInt32(this.compositionEndTime);
          };
          BoxParser.cttsBox.prototype.write = function(stream) {
            var i2;
            this.version = 0;
            this.flags = 0;
            this.size = 4 + 8 * this.sample_counts.length;
            this.writeHeader(stream);
            stream.writeUint32(this.sample_counts.length);
            for (i2 = 0; i2 < this.sample_counts.length; i2++) {
              stream.writeUint32(this.sample_counts[i2]);
              if (this.version === 1) {
                stream.writeInt32(this.sample_offsets[i2]);
              } else {
                stream.writeUint32(this.sample_offsets[i2]);
              }
            }
          };
          BoxParser.drefBox.prototype.write = function(stream) {
            this.version = 0;
            this.flags = 0;
            this.size = 4;
            this.writeHeader(stream);
            stream.writeUint32(this.entries.length);
            for (var i2 = 0; i2 < this.entries.length; i2++) {
              this.entries[i2].write(stream);
              this.size += this.entries[i2].size;
            }
            Log.debug("BoxWriter", "Adjusting box " + this.type + " with new size " + this.size);
            stream.adjustUint32(this.sizePosition, this.size);
          };
          BoxParser.elngBox.prototype.write = function(stream) {
            this.version = 0;
            this.flags = 0;
            this.size = this.extended_language.length;
            this.writeHeader(stream);
            stream.writeString(this.extended_language);
          };
          BoxParser.elstBox.prototype.write = function(stream) {
            this.version = 0;
            this.flags = 0;
            this.size = 4 + 12 * this.entries.length;
            this.writeHeader(stream);
            stream.writeUint32(this.entries.length);
            for (var i2 = 0; i2 < this.entries.length; i2++) {
              var entry = this.entries[i2];
              stream.writeUint32(entry.segment_duration);
              stream.writeInt32(entry.media_time);
              stream.writeInt16(entry.media_rate_integer);
              stream.writeInt16(entry.media_rate_fraction);
            }
          };
          BoxParser.emsgBox.prototype.write = function(stream) {
            this.version = 0;
            this.flags = 0;
            this.size = 4 * 4 + this.message_data.length + (this.scheme_id_uri.length + 1) + (this.value.length + 1);
            this.writeHeader(stream);
            stream.writeCString(this.scheme_id_uri);
            stream.writeCString(this.value);
            stream.writeUint32(this.timescale);
            stream.writeUint32(this.presentation_time_delta);
            stream.writeUint32(this.event_duration);
            stream.writeUint32(this.id);
            stream.writeUint8Array(this.message_data);
          };
          BoxParser.ftypBox.prototype.write = function(stream) {
            this.size = 8 + 4 * this.compatible_brands.length;
            this.writeHeader(stream);
            stream.writeString(this.major_brand, null, 4);
            stream.writeUint32(this.minor_version);
            for (var i2 = 0; i2 < this.compatible_brands.length; i2++) {
              stream.writeString(this.compatible_brands[i2], null, 4);
            }
          };
          BoxParser.hdlrBox.prototype.write = function(stream) {
            this.size = 5 * 4 + this.name.length + 1;
            this.version = 0;
            this.flags = 0;
            this.writeHeader(stream);
            stream.writeUint32(0);
            stream.writeString(this.handler, null, 4);
            stream.writeUint32(0);
            stream.writeUint32(0);
            stream.writeUint32(0);
            stream.writeCString(this.name);
          };
          BoxParser.hvcCBox.prototype.write = function(stream) {
            var i2, j;
            this.size = 23;
            for (i2 = 0; i2 < this.nalu_arrays.length; i2++) {
              this.size += 3;
              for (j = 0; j < this.nalu_arrays[i2].length; j++) {
                this.size += 2 + this.nalu_arrays[i2][j].data.length;
              }
            }
            this.writeHeader(stream);
            stream.writeUint8(this.configurationVersion);
            stream.writeUint8((this.general_profile_space << 6) + (this.general_tier_flag << 5) + this.general_profile_idc);
            stream.writeUint32(this.general_profile_compatibility);
            stream.writeUint8Array(this.general_constraint_indicator);
            stream.writeUint8(this.general_level_idc);
            stream.writeUint16(this.min_spatial_segmentation_idc + (15 << 24));
            stream.writeUint8(this.parallelismType + (63 << 2));
            stream.writeUint8(this.chroma_format_idc + (63 << 2));
            stream.writeUint8(this.bit_depth_luma_minus8 + (31 << 3));
            stream.writeUint8(this.bit_depth_chroma_minus8 + (31 << 3));
            stream.writeUint16(this.avgFrameRate);
            stream.writeUint8((this.constantFrameRate << 6) + (this.numTemporalLayers << 3) + (this.temporalIdNested << 2) + this.lengthSizeMinusOne);
            stream.writeUint8(this.nalu_arrays.length);
            for (i2 = 0; i2 < this.nalu_arrays.length; i2++) {
              stream.writeUint8((this.nalu_arrays[i2].completeness << 7) + this.nalu_arrays[i2].nalu_type);
              stream.writeUint16(this.nalu_arrays[i2].length);
              for (j = 0; j < this.nalu_arrays[i2].length; j++) {
                stream.writeUint16(this.nalu_arrays[i2][j].data.length);
                stream.writeUint8Array(this.nalu_arrays[i2][j].data);
              }
            }
          };
          BoxParser.kindBox.prototype.write = function(stream) {
            this.version = 0;
            this.flags = 0;
            this.size = this.schemeURI.length + 1 + (this.value.length + 1);
            this.writeHeader(stream);
            stream.writeCString(this.schemeURI);
            stream.writeCString(this.value);
          };
          BoxParser.mdhdBox.prototype.write = function(stream) {
            this.size = 4 * 4 + 2 * 2;
            this.flags = 0;
            this.version = 0;
            this.writeHeader(stream);
            stream.writeUint32(this.creation_time);
            stream.writeUint32(this.modification_time);
            stream.writeUint32(this.timescale);
            stream.writeUint32(this.duration);
            stream.writeUint16(this.language);
            stream.writeUint16(0);
          };
          BoxParser.mehdBox.prototype.write = function(stream) {
            this.version = 0;
            this.flags = 0;
            this.size = 4;
            this.writeHeader(stream);
            stream.writeUint32(this.fragment_duration);
          };
          BoxParser.mfhdBox.prototype.write = function(stream) {
            this.version = 0;
            this.flags = 0;
            this.size = 4;
            this.writeHeader(stream);
            stream.writeUint32(this.sequence_number);
          };
          BoxParser.mvhdBox.prototype.write = function(stream) {
            this.version = 0;
            this.flags = 0;
            this.size = 23 * 4 + 2 * 2;
            this.writeHeader(stream);
            stream.writeUint32(this.creation_time);
            stream.writeUint32(this.modification_time);
            stream.writeUint32(this.timescale);
            stream.writeUint32(this.duration);
            stream.writeUint32(this.rate);
            stream.writeUint16(this.volume << 8);
            stream.writeUint16(0);
            stream.writeUint32(0);
            stream.writeUint32(0);
            stream.writeUint32Array(this.matrix);
            stream.writeUint32(0);
            stream.writeUint32(0);
            stream.writeUint32(0);
            stream.writeUint32(0);
            stream.writeUint32(0);
            stream.writeUint32(0);
            stream.writeUint32(this.next_track_id);
          };
          BoxParser.SampleEntry.prototype.writeHeader = function(stream) {
            this.size = 8;
            BoxParser.Box.prototype.writeHeader.call(this, stream);
            stream.writeUint8(0);
            stream.writeUint8(0);
            stream.writeUint8(0);
            stream.writeUint8(0);
            stream.writeUint8(0);
            stream.writeUint8(0);
            stream.writeUint16(this.data_reference_index);
          };
          BoxParser.SampleEntry.prototype.writeFooter = function(stream) {
            for (var i2 = 0; i2 < this.boxes.length; i2++) {
              this.boxes[i2].write(stream);
              this.size += this.boxes[i2].size;
            }
            Log.debug("BoxWriter", "Adjusting box " + this.type + " with new size " + this.size);
            stream.adjustUint32(this.sizePosition, this.size);
          };
          BoxParser.SampleEntry.prototype.write = function(stream) {
            this.writeHeader(stream);
            stream.writeUint8Array(this.data);
            this.size += this.data.length;
            Log.debug("BoxWriter", "Adjusting box " + this.type + " with new size " + this.size);
            stream.adjustUint32(this.sizePosition, this.size);
          };
          BoxParser.VisualSampleEntry.prototype.write = function(stream) {
            this.writeHeader(stream);
            this.size += 2 * 7 + 6 * 4 + 32;
            stream.writeUint16(0);
            stream.writeUint16(0);
            stream.writeUint32(0);
            stream.writeUint32(0);
            stream.writeUint32(0);
            stream.writeUint16(this.width);
            stream.writeUint16(this.height);
            stream.writeUint32(this.horizresolution);
            stream.writeUint32(this.vertresolution);
            stream.writeUint32(0);
            stream.writeUint16(this.frame_count);
            stream.writeUint8(Math.min(31, this.compressorname.length));
            stream.writeString(this.compressorname, null, 31);
            stream.writeUint16(this.depth);
            stream.writeInt16(-1);
            this.writeFooter(stream);
          };
          BoxParser.AudioSampleEntry.prototype.write = function(stream) {
            this.writeHeader(stream);
            this.size += 2 * 4 + 3 * 4;
            stream.writeUint32(0);
            stream.writeUint32(0);
            stream.writeUint16(this.channel_count);
            stream.writeUint16(this.samplesize);
            stream.writeUint16(0);
            stream.writeUint16(0);
            stream.writeUint32(this.samplerate << 16);
            this.writeFooter(stream);
          };
          BoxParser.stppSampleEntry.prototype.write = function(stream) {
            this.writeHeader(stream);
            this.size += this.namespace.length + 1 + this.schema_location.length + 1 + this.auxiliary_mime_types.length + 1;
            stream.writeCString(this.namespace);
            stream.writeCString(this.schema_location);
            stream.writeCString(this.auxiliary_mime_types);
            this.writeFooter(stream);
          };
          BoxParser.SampleGroupEntry.prototype.write = function(stream) {
            stream.writeUint8Array(this.data);
          };
          BoxParser.sbgpBox.prototype.write = function(stream) {
            this.version = 1;
            this.flags = 0;
            this.size = 12 + 8 * this.entries.length;
            this.writeHeader(stream);
            stream.writeString(this.grouping_type, null, 4);
            stream.writeUint32(this.grouping_type_parameter);
            stream.writeUint32(this.entries.length);
            for (var i2 = 0; i2 < this.entries.length; i2++) {
              var entry = this.entries[i2];
              stream.writeInt32(entry.sample_count);
              stream.writeInt32(entry.group_description_index);
            }
          };
          BoxParser.sgpdBox.prototype.write = function(stream) {
            var i2;
            var entry;
            this.flags = 0;
            this.size = 12;
            for (i2 = 0; i2 < this.entries.length; i2++) {
              entry = this.entries[i2];
              if (this.version === 1) {
                if (this.default_length === 0) {
                  this.size += 4;
                }
                this.size += entry.data.length;
              }
            }
            this.writeHeader(stream);
            stream.writeString(this.grouping_type, null, 4);
            if (this.version === 1) {
              stream.writeUint32(this.default_length);
            }
            if (this.version >= 2) {
              stream.writeUint32(this.default_sample_description_index);
            }
            stream.writeUint32(this.entries.length);
            for (i2 = 0; i2 < this.entries.length; i2++) {
              entry = this.entries[i2];
              if (this.version === 1) {
                if (this.default_length === 0) {
                  stream.writeUint32(entry.description_length);
                }
              }
              entry.write(stream);
            }
          };
          BoxParser.sidxBox.prototype.write = function(stream) {
            this.version = 0;
            this.flags = 0;
            this.size = 4 * 4 + 2 + 2 + 12 * this.references.length;
            this.writeHeader(stream);
            stream.writeUint32(this.reference_ID);
            stream.writeUint32(this.timescale);
            stream.writeUint32(this.earliest_presentation_time);
            stream.writeUint32(this.first_offset);
            stream.writeUint16(0);
            stream.writeUint16(this.references.length);
            for (var i2 = 0; i2 < this.references.length; i2++) {
              var ref2 = this.references[i2];
              stream.writeUint32(ref2.reference_type << 31 | ref2.referenced_size);
              stream.writeUint32(ref2.subsegment_duration);
              stream.writeUint32(ref2.starts_with_SAP << 31 | ref2.SAP_type << 28 | ref2.SAP_delta_time);
            }
          };
          BoxParser.smhdBox.prototype.write = function(stream) {
            this.version = 0;
            this.flags = 1;
            this.size = 4;
            this.writeHeader(stream);
            stream.writeUint16(this.balance);
            stream.writeUint16(0);
          };
          BoxParser.stcoBox.prototype.write = function(stream) {
            this.version = 0;
            this.flags = 0;
            this.size = 4 + 4 * this.chunk_offsets.length;
            this.writeHeader(stream);
            stream.writeUint32(this.chunk_offsets.length);
            stream.writeUint32Array(this.chunk_offsets);
          };
          BoxParser.stscBox.prototype.write = function(stream) {
            var i2;
            this.version = 0;
            this.flags = 0;
            this.size = 4 + 12 * this.first_chunk.length;
            this.writeHeader(stream);
            stream.writeUint32(this.first_chunk.length);
            for (i2 = 0; i2 < this.first_chunk.length; i2++) {
              stream.writeUint32(this.first_chunk[i2]);
              stream.writeUint32(this.samples_per_chunk[i2]);
              stream.writeUint32(this.sample_description_index[i2]);
            }
          };
          BoxParser.stsdBox.prototype.write = function(stream) {
            var i2;
            this.version = 0;
            this.flags = 0;
            this.size = 0;
            this.writeHeader(stream);
            stream.writeUint32(this.entries.length);
            this.size += 4;
            for (i2 = 0; i2 < this.entries.length; i2++) {
              this.entries[i2].write(stream);
              this.size += this.entries[i2].size;
            }
            Log.debug("BoxWriter", "Adjusting box " + this.type + " with new size " + this.size);
            stream.adjustUint32(this.sizePosition, this.size);
          };
          BoxParser.stshBox.prototype.write = function(stream) {
            var i2;
            this.version = 0;
            this.flags = 0;
            this.size = 4 + 8 * this.shadowed_sample_numbers.length;
            this.writeHeader(stream);
            stream.writeUint32(this.shadowed_sample_numbers.length);
            for (i2 = 0; i2 < this.shadowed_sample_numbers.length; i2++) {
              stream.writeUint32(this.shadowed_sample_numbers[i2]);
              stream.writeUint32(this.sync_sample_numbers[i2]);
            }
          };
          BoxParser.stssBox.prototype.write = function(stream) {
            this.version = 0;
            this.flags = 0;
            this.size = 4 + 4 * this.sample_numbers.length;
            this.writeHeader(stream);
            stream.writeUint32(this.sample_numbers.length);
            stream.writeUint32Array(this.sample_numbers);
          };
          BoxParser.stszBox.prototype.write = function(stream) {
            var i2;
            var constant = true;
            this.version = 0;
            this.flags = 0;
            if (this.sample_sizes.length > 0) {
              i2 = 0;
              while (i2 + 1 < this.sample_sizes.length) {
                if (this.sample_sizes[i2 + 1] !== this.sample_sizes[0]) {
                  constant = false;
                  break;
                } else {
                  i2++;
                }
              }
            } else {
              constant = false;
            }
            this.size = 8;
            if (!constant) {
              this.size += 4 * this.sample_sizes.length;
            }
            this.writeHeader(stream);
            if (!constant) {
              stream.writeUint32(0);
            } else {
              stream.writeUint32(this.sample_sizes[0]);
            }
            stream.writeUint32(this.sample_sizes.length);
            if (!constant) {
              stream.writeUint32Array(this.sample_sizes);
            }
          };
          BoxParser.sttsBox.prototype.write = function(stream) {
            var i2;
            this.version = 0;
            this.flags = 0;
            this.size = 4 + 8 * this.sample_counts.length;
            this.writeHeader(stream);
            stream.writeUint32(this.sample_counts.length);
            for (i2 = 0; i2 < this.sample_counts.length; i2++) {
              stream.writeUint32(this.sample_counts[i2]);
              stream.writeUint32(this.sample_deltas[i2]);
            }
          };
          BoxParser.tfdtBox.prototype.write = function(stream) {
            var UINT32_MAX = Math.pow(2, 32) - 1;
            this.version = this.baseMediaDecodeTime > UINT32_MAX ? 1 : 0;
            this.flags = 0;
            this.size = 4;
            if (this.version === 1) {
              this.size += 4;
            }
            this.writeHeader(stream);
            if (this.version === 1) {
              stream.writeUint64(this.baseMediaDecodeTime);
            } else {
              stream.writeUint32(this.baseMediaDecodeTime);
            }
          };
          BoxParser.tfhdBox.prototype.write = function(stream) {
            this.version = 0;
            this.size = 4;
            if (this.flags & BoxParser.TFHD_FLAG_BASE_DATA_OFFSET) {
              this.size += 8;
            }
            if (this.flags & BoxParser.TFHD_FLAG_SAMPLE_DESC) {
              this.size += 4;
            }
            if (this.flags & BoxParser.TFHD_FLAG_SAMPLE_DUR) {
              this.size += 4;
            }
            if (this.flags & BoxParser.TFHD_FLAG_SAMPLE_SIZE) {
              this.size += 4;
            }
            if (this.flags & BoxParser.TFHD_FLAG_SAMPLE_FLAGS) {
              this.size += 4;
            }
            this.writeHeader(stream);
            stream.writeUint32(this.track_id);
            if (this.flags & BoxParser.TFHD_FLAG_BASE_DATA_OFFSET) {
              stream.writeUint64(this.base_data_offset);
            }
            if (this.flags & BoxParser.TFHD_FLAG_SAMPLE_DESC) {
              stream.writeUint32(this.default_sample_description_index);
            }
            if (this.flags & BoxParser.TFHD_FLAG_SAMPLE_DUR) {
              stream.writeUint32(this.default_sample_duration);
            }
            if (this.flags & BoxParser.TFHD_FLAG_SAMPLE_SIZE) {
              stream.writeUint32(this.default_sample_size);
            }
            if (this.flags & BoxParser.TFHD_FLAG_SAMPLE_FLAGS) {
              stream.writeUint32(this.default_sample_flags);
            }
          };
          BoxParser.tkhdBox.prototype.write = function(stream) {
            this.version = 0;
            this.size = 4 * 18 + 2 * 4;
            this.writeHeader(stream);
            stream.writeUint32(this.creation_time);
            stream.writeUint32(this.modification_time);
            stream.writeUint32(this.track_id);
            stream.writeUint32(0);
            stream.writeUint32(this.duration);
            stream.writeUint32(0);
            stream.writeUint32(0);
            stream.writeInt16(this.layer);
            stream.writeInt16(this.alternate_group);
            stream.writeInt16(this.volume << 8);
            stream.writeUint16(0);
            stream.writeInt32Array(this.matrix);
            stream.writeUint32(this.width);
            stream.writeUint32(this.height);
          };
          BoxParser.trexBox.prototype.write = function(stream) {
            this.version = 0;
            this.flags = 0;
            this.size = 4 * 5;
            this.writeHeader(stream);
            stream.writeUint32(this.track_id);
            stream.writeUint32(this.default_sample_description_index);
            stream.writeUint32(this.default_sample_duration);
            stream.writeUint32(this.default_sample_size);
            stream.writeUint32(this.default_sample_flags);
          };
          BoxParser.trunBox.prototype.write = function(stream) {
            this.version = 0;
            this.size = 4;
            if (this.flags & BoxParser.TRUN_FLAGS_DATA_OFFSET) {
              this.size += 4;
            }
            if (this.flags & BoxParser.TRUN_FLAGS_FIRST_FLAG) {
              this.size += 4;
            }
            if (this.flags & BoxParser.TRUN_FLAGS_DURATION) {
              this.size += 4 * this.sample_duration.length;
            }
            if (this.flags & BoxParser.TRUN_FLAGS_SIZE) {
              this.size += 4 * this.sample_size.length;
            }
            if (this.flags & BoxParser.TRUN_FLAGS_FLAGS) {
              this.size += 4 * this.sample_flags.length;
            }
            if (this.flags & BoxParser.TRUN_FLAGS_CTS_OFFSET) {
              this.size += 4 * this.sample_composition_time_offset.length;
            }
            this.writeHeader(stream);
            stream.writeUint32(this.sample_count);
            if (this.flags & BoxParser.TRUN_FLAGS_DATA_OFFSET) {
              this.data_offset_position = stream.getPosition();
              stream.writeInt32(this.data_offset);
            }
            if (this.flags & BoxParser.TRUN_FLAGS_FIRST_FLAG) {
              stream.writeUint32(this.first_sample_flags);
            }
            for (var i2 = 0; i2 < this.sample_count; i2++) {
              if (this.flags & BoxParser.TRUN_FLAGS_DURATION) {
                stream.writeUint32(this.sample_duration[i2]);
              }
              if (this.flags & BoxParser.TRUN_FLAGS_SIZE) {
                stream.writeUint32(this.sample_size[i2]);
              }
              if (this.flags & BoxParser.TRUN_FLAGS_FLAGS) {
                stream.writeUint32(this.sample_flags[i2]);
              }
              if (this.flags & BoxParser.TRUN_FLAGS_CTS_OFFSET) {
                if (this.version === 0) {
                  stream.writeUint32(this.sample_composition_time_offset[i2]);
                } else {
                  stream.writeInt32(this.sample_composition_time_offset[i2]);
                }
              }
            }
          };
          BoxParser["url Box"].prototype.write = function(stream) {
            this.version = 0;
            if (this.location) {
              this.flags = 0;
              this.size = this.location.length + 1;
            } else {
              this.flags = 1;
              this.size = 0;
            }
            this.writeHeader(stream);
            if (this.location) {
              stream.writeCString(this.location);
            }
          };
          BoxParser["urn Box"].prototype.write = function(stream) {
            this.version = 0;
            this.flags = 0;
            this.size = this.name.length + 1 + (this.location ? this.location.length + 1 : 0);
            this.writeHeader(stream);
            stream.writeCString(this.name);
            if (this.location) {
              stream.writeCString(this.location);
            }
          };
          BoxParser.vmhdBox.prototype.write = function(stream) {
            this.version = 0;
            this.flags = 1;
            this.size = 8;
            this.writeHeader(stream);
            stream.writeUint16(this.graphicsmode);
            stream.writeUint16Array(this.opcolor);
          };
          BoxParser.cttsBox.prototype.unpack = function(samples) {
            var i2, j, k;
            k = 0;
            for (i2 = 0; i2 < this.sample_counts.length; i2++) {
              for (j = 0; j < this.sample_counts[i2]; j++) {
                samples[k].pts = samples[k].dts + this.sample_offsets[i2];
                k++;
              }
            }
          };
          BoxParser.sttsBox.prototype.unpack = function(samples) {
            var i2, j, k;
            k = 0;
            for (i2 = 0; i2 < this.sample_counts.length; i2++) {
              for (j = 0; j < this.sample_counts[i2]; j++) {
                if (k === 0) {
                  samples[k].dts = 0;
                } else {
                  samples[k].dts = samples[k - 1].dts + this.sample_deltas[i2];
                }
                k++;
              }
            }
          };
          BoxParser.stcoBox.prototype.unpack = function(samples) {
            var i2;
            for (i2 = 0; i2 < this.chunk_offsets.length; i2++) {
              samples[i2].offset = this.chunk_offsets[i2];
            }
          };
          BoxParser.stscBox.prototype.unpack = function(samples) {
            var i2, j, k, l, m;
            l = 0;
            m = 0;
            for (i2 = 0; i2 < this.first_chunk.length; i2++) {
              for (j = 0; j < (i2 + 1 < this.first_chunk.length ? this.first_chunk[i2 + 1] : Infinity); j++) {
                m++;
                for (k = 0; k < this.samples_per_chunk[i2]; k++) {
                  if (samples[l]) {
                    samples[l].description_index = this.sample_description_index[i2];
                    samples[l].chunk_index = m;
                  } else {
                    return;
                  }
                  l++;
                }
              }
            }
          };
          BoxParser.stszBox.prototype.unpack = function(samples) {
            var i2;
            for (i2 = 0; i2 < this.sample_sizes.length; i2++) {
              samples[i2].size = this.sample_sizes[i2];
            }
          };
          BoxParser.DIFF_BOXES_PROP_NAMES = [
            "boxes",
            "entries",
            "references",
            "subsamples",
            "items",
            "item_infos",
            "extents",
            "associations",
            "subsegments",
            "ranges",
            "seekLists",
            "seekPoints",
            "esd",
            "levels"
          ];
          BoxParser.DIFF_PRIMITIVE_ARRAY_PROP_NAMES = [
            "compatible_brands",
            "matrix",
            "opcolor",
            "sample_counts",
            "sample_counts",
            "sample_deltas",
            "first_chunk",
            "samples_per_chunk",
            "sample_sizes",
            "chunk_offsets",
            "sample_offsets",
            "sample_description_index",
            "sample_duration"
          ];
          BoxParser.boxEqualFields = function(box_a, box_b) {
            if (box_a && !box_b) return false;
            var prop;
            for (prop in box_a) {
              if (BoxParser.DIFF_BOXES_PROP_NAMES.indexOf(prop) > -1) {
                continue;
              } else if (box_a[prop] instanceof BoxParser.Box || box_b[prop] instanceof BoxParser.Box) {
                continue;
              } else if (typeof box_a[prop] === "undefined" || typeof box_b[prop] === "undefined") {
                continue;
              } else if (typeof box_a[prop] === "function" || typeof box_b[prop] === "function") {
                continue;
              } else if (box_a.subBoxNames && box_a.subBoxNames.indexOf(prop.slice(0, 4)) > -1 || box_b.subBoxNames && box_b.subBoxNames.indexOf(prop.slice(0, 4)) > -1) {
                continue;
              } else {
                if (prop === "data" || prop === "start" || prop === "size" || prop === "creation_time" || prop === "modification_time") {
                  continue;
                } else if (BoxParser.DIFF_PRIMITIVE_ARRAY_PROP_NAMES.indexOf(prop) > -1) {
                  continue;
                } else {
                  if (box_a[prop] !== box_b[prop]) {
                    return false;
                  }
                }
              }
            }
            return true;
          };
          BoxParser.boxEqual = function(box_a, box_b) {
            if (!BoxParser.boxEqualFields(box_a, box_b)) {
              return false;
            }
            for (var j = 0; j < BoxParser.DIFF_BOXES_PROP_NAMES.length; j++) {
              var name = BoxParser.DIFF_BOXES_PROP_NAMES[j];
              if (box_a[name] && box_b[name]) {
                if (!BoxParser.boxEqual(box_a[name], box_b[name])) {
                  return false;
                }
              }
            }
            return true;
          };
          var VTTin4Parser = function() {
          };
          VTTin4Parser.prototype.parseSample = function(data) {
            var cues, cue;
            var stream = new MP4BoxStream(data.buffer);
            cues = [];
            while (!stream.isEos()) {
              cue = BoxParser.parseOneBox(stream, false);
              if (cue.code === BoxParser.OK && cue.box.type === "vttc") {
                cues.push(cue.box);
              }
            }
            return cues;
          };
          VTTin4Parser.prototype.getText = function(startTime, endTime, data) {
            function pad(n, width, z) {
              z = z || "0";
              n = n + "";
              return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
            }
            function secToTimestamp(insec) {
              var h2 = Math.floor(insec / 3600);
              var m = Math.floor((insec - h2 * 3600) / 60);
              var s = Math.floor(insec - h2 * 3600 - m * 60);
              var ms = Math.floor((insec - h2 * 3600 - m * 60 - s) * 1e3);
              return "" + pad(h2, 2) + ":" + pad(m, 2) + ":" + pad(s, 2) + "." + pad(ms, 3);
            }
            var cues = this.parseSample(data);
            var string = "";
            for (var i2 = 0; i2 < cues.length; i2++) {
              var cueIn4 = cues[i2];
              string += secToTimestamp(startTime) + " --> " + secToTimestamp(endTime) + "\r\n";
              string += cueIn4.payl.text;
            }
            return string;
          };
          var XMLSubtitlein4Parser = function() {
          };
          XMLSubtitlein4Parser.prototype.parseSample = function(sample) {
            var res = {};
            var i2;
            res.resources = [];
            var stream = new MP4BoxStream(sample.data.buffer);
            if (!sample.subsamples || sample.subsamples.length === 0) {
              res.documentString = stream.readString(sample.data.length);
            } else {
              res.documentString = stream.readString(sample.subsamples[0].size);
              if (sample.subsamples.length > 1) {
                for (i2 = 1; i2 < sample.subsamples.length; i2++) {
                  res.resources[i2] = stream.readUint8Array(sample.subsamples[i2].size);
                }
              }
            }
            if (typeof DOMParser !== "undefined") {
              res.document = new DOMParser().parseFromString(res.documentString, "application/xml");
            }
            return res;
          };
          var Textin4Parser = function() {
          };
          Textin4Parser.prototype.parseSample = function(sample) {
            var textString;
            var stream = new MP4BoxStream(sample.data.buffer);
            textString = stream.readString(sample.data.length);
            return textString;
          };
          Textin4Parser.prototype.parseConfig = function(data) {
            var textString;
            var stream = new MP4BoxStream(data.buffer);
            stream.readUint32();
            textString = stream.readCString();
            return textString;
          };
          {
            exports.VTTin4Parser = VTTin4Parser;
            exports.XMLSubtitlein4Parser = XMLSubtitlein4Parser;
            exports.Textin4Parser = Textin4Parser;
          }
          var ISOFile = function(stream) {
            this.stream = stream || new MultiBufferStream();
            this.boxes = [];
            this.mdats = [];
            this.moofs = [];
            this.isProgressive = false;
            this.moovStartFound = false;
            this.onMoovStart = null;
            this.moovStartSent = false;
            this.onReady = null;
            this.readySent = false;
            this.onSegment = null;
            this.onSamples = null;
            this.onError = null;
            this.sampleListBuilt = false;
            this.fragmentedTracks = [];
            this.extractedTracks = [];
            this.isFragmentationInitialized = false;
            this.sampleProcessingStarted = false;
            this.nextMoofNumber = 0;
            this.itemListBuilt = false;
            this.items = [];
            this.entity_groups = [];
            this.onSidx = null;
            this.sidxSent = false;
          };
          ISOFile.prototype.setSegmentOptions = function(id, user, options) {
            var trak = this.getTrackById(id);
            if (trak) {
              var fragTrack = {};
              this.fragmentedTracks.push(fragTrack);
              fragTrack.id = id;
              fragTrack.user = user;
              fragTrack.trak = trak;
              trak.nextSample = 0;
              fragTrack.segmentStream = null;
              fragTrack.nb_samples = 1e3;
              fragTrack.rapAlignement = true;
              if (options) {
                if (options.nbSamples) fragTrack.nb_samples = options.nbSamples;
                if (options.rapAlignement) fragTrack.rapAlignement = options.rapAlignement;
              }
            }
          };
          ISOFile.prototype.unsetSegmentOptions = function(id) {
            var index = -1;
            for (var i2 = 0; i2 < this.fragmentedTracks.length; i2++) {
              var fragTrack = this.fragmentedTracks[i2];
              if (fragTrack.id == id) {
                index = i2;
              }
            }
            if (index > -1) {
              this.fragmentedTracks.splice(index, 1);
            }
          };
          ISOFile.prototype.setExtractionOptions = function(id, user, options) {
            var trak = this.getTrackById(id);
            if (trak) {
              var extractTrack = {};
              this.extractedTracks.push(extractTrack);
              extractTrack.id = id;
              extractTrack.user = user;
              extractTrack.trak = trak;
              trak.nextSample = 0;
              extractTrack.nb_samples = 1e3;
              extractTrack.samples = [];
              if (options) {
                if (options.nbSamples) extractTrack.nb_samples = options.nbSamples;
              }
            }
          };
          ISOFile.prototype.unsetExtractionOptions = function(id) {
            var index = -1;
            for (var i2 = 0; i2 < this.extractedTracks.length; i2++) {
              var extractTrack = this.extractedTracks[i2];
              if (extractTrack.id == id) {
                index = i2;
              }
            }
            if (index > -1) {
              this.extractedTracks.splice(index, 1);
            }
          };
          ISOFile.prototype.parse = function() {
            var ret2;
            var box2;
            var parseBoxHeadersOnly = false;
            if (this.restoreParsePosition) {
              if (!this.restoreParsePosition()) {
                return;
              }
            }
            while (true) {
              if (this.hasIncompleteMdat && this.hasIncompleteMdat()) {
                if (this.processIncompleteMdat()) {
                  continue;
                } else {
                  return;
                }
              } else {
                if (this.saveParsePosition) {
                  this.saveParsePosition();
                }
                ret2 = BoxParser.parseOneBox(this.stream, parseBoxHeadersOnly);
                if (ret2.code === BoxParser.ERR_NOT_ENOUGH_DATA) {
                  if (this.processIncompleteBox) {
                    if (this.processIncompleteBox(ret2)) {
                      continue;
                    } else {
                      return;
                    }
                  } else {
                    return;
                  }
                } else {
                  var box_type;
                  box2 = ret2.box;
                  box_type = box2.type !== "uuid" ? box2.type : box2.uuid;
                  this.boxes.push(box2);
                  switch (box_type) {
                    case "mdat":
                      this.mdats.push(box2);
                      break;
                    case "moof":
                      this.moofs.push(box2);
                      break;
                    case "moov":
                      this.moovStartFound = true;
                      if (this.mdats.length === 0) {
                        this.isProgressive = true;
                      }
                    /* no break */
                    /* falls through */
                    default:
                      if (this[box_type] !== undefined) {
                        Log.warn("ISOFile", "Duplicate Box of type: " + box_type + ", overriding previous occurrence");
                      }
                      this[box_type] = box2;
                      break;
                  }
                  if (this.updateUsedBytes) {
                    this.updateUsedBytes(box2, ret2);
                  }
                }
              }
            }
          };
          ISOFile.prototype.checkBuffer = function(ab) {
            if (ab === null || ab === undefined) {
              throw "Buffer must be defined and non empty";
            }
            if (ab.fileStart === undefined) {
              throw "Buffer must have a fileStart property";
            }
            if (ab.byteLength === 0) {
              Log.warn("ISOFile", "Ignoring empty buffer (fileStart: " + ab.fileStart + ")");
              this.stream.logBufferLevel();
              return false;
            }
            Log.info("ISOFile", "Processing buffer (fileStart: " + ab.fileStart + ")");
            ab.usedBytes = 0;
            this.stream.insertBuffer(ab);
            this.stream.logBufferLevel();
            if (!this.stream.initialized()) {
              Log.warn("ISOFile", "Not ready to start parsing");
              return false;
            }
            return true;
          };
          ISOFile.prototype.appendBuffer = function(ab, last) {
            var nextFileStart;
            if (!this.checkBuffer(ab)) {
              return;
            }
            this.parse();
            if (this.moovStartFound && !this.moovStartSent) {
              this.moovStartSent = true;
              if (this.onMoovStart) this.onMoovStart();
            }
            if (this.moov) {
              if (!this.sampleListBuilt) {
                this.buildSampleLists();
                this.sampleListBuilt = true;
              }
              this.updateSampleLists();
              if (this.onReady && !this.readySent) {
                this.readySent = true;
                this.onReady(this.getInfo());
              }
              this.processSamples(last);
              if (this.nextSeekPosition) {
                nextFileStart = this.nextSeekPosition;
                this.nextSeekPosition = undefined;
              } else {
                nextFileStart = this.nextParsePosition;
              }
              if (this.stream.getEndFilePositionAfter) {
                nextFileStart = this.stream.getEndFilePositionAfter(nextFileStart);
              }
            } else {
              if (this.nextParsePosition) {
                nextFileStart = this.nextParsePosition;
              } else {
                nextFileStart = 0;
              }
            }
            if (this.sidx) {
              if (this.onSidx && !this.sidxSent) {
                this.onSidx(this.sidx);
                this.sidxSent = true;
              }
            }
            if (this.meta) {
              if (this.flattenItemInfo && !this.itemListBuilt) {
                this.flattenItemInfo();
                this.itemListBuilt = true;
              }
              if (this.processItems) {
                this.processItems(this.onItem);
              }
            }
            if (this.stream.cleanBuffers) {
              Log.info("ISOFile", "Done processing buffer (fileStart: " + ab.fileStart + ") - next buffer to fetch should have a fileStart position of " + nextFileStart);
              this.stream.logBufferLevel();
              this.stream.cleanBuffers();
              this.stream.logBufferLevel(true);
              Log.info("ISOFile", "Sample data size in memory: " + this.getAllocatedSampleDataSize());
            }
            return nextFileStart;
          };
          ISOFile.prototype.getInfo = function() {
            var i2, j;
            var movie = {};
            var trak;
            var track;
            var ref2;
            var sample_desc;
            var _1904 = (/* @__PURE__ */ new Date("1904-01-01T00:00:00Z")).getTime();
            if (this.moov) {
              movie.hasMoov = true;
              movie.duration = this.moov.mvhd.duration;
              movie.timescale = this.moov.mvhd.timescale;
              movie.isFragmented = this.moov.mvex != null;
              if (movie.isFragmented && this.moov.mvex.mehd) {
                movie.fragment_duration = this.moov.mvex.mehd.fragment_duration;
              }
              movie.isProgressive = this.isProgressive;
              movie.hasIOD = this.moov.iods != null;
              movie.brands = [];
              movie.brands.push(this.ftyp.major_brand);
              movie.brands = movie.brands.concat(this.ftyp.compatible_brands);
              movie.created = new Date(_1904 + this.moov.mvhd.creation_time * 1e3);
              movie.modified = new Date(_1904 + this.moov.mvhd.modification_time * 1e3);
              movie.tracks = [];
              movie.audioTracks = [];
              movie.videoTracks = [];
              movie.subtitleTracks = [];
              movie.metadataTracks = [];
              movie.hintTracks = [];
              movie.otherTracks = [];
              for (i2 = 0; i2 < this.moov.traks.length; i2++) {
                trak = this.moov.traks[i2];
                sample_desc = trak.mdia.minf.stbl.stsd.entries[0];
                track = {};
                movie.tracks.push(track);
                track.id = trak.tkhd.track_id;
                track.name = trak.mdia.hdlr.name;
                track.references = [];
                if (trak.tref) {
                  for (j = 0; j < trak.tref.boxes.length; j++) {
                    ref2 = {};
                    track.references.push(ref2);
                    ref2.type = trak.tref.boxes[j].type;
                    ref2.track_ids = trak.tref.boxes[j].track_ids;
                  }
                }
                if (trak.edts) {
                  track.edits = trak.edts.elst.entries;
                }
                track.created = new Date(_1904 + trak.tkhd.creation_time * 1e3);
                track.modified = new Date(_1904 + trak.tkhd.modification_time * 1e3);
                track.movie_duration = trak.tkhd.duration;
                track.movie_timescale = movie.timescale;
                track.layer = trak.tkhd.layer;
                track.alternate_group = trak.tkhd.alternate_group;
                track.volume = trak.tkhd.volume;
                track.matrix = trak.tkhd.matrix;
                track.track_width = trak.tkhd.width / (1 << 16);
                track.track_height = trak.tkhd.height / (1 << 16);
                track.timescale = trak.mdia.mdhd.timescale;
                track.cts_shift = trak.mdia.minf.stbl.cslg;
                track.duration = trak.mdia.mdhd.duration;
                track.samples_duration = trak.samples_duration;
                track.codec = sample_desc.getCodec();
                track.kind = trak.udta && trak.udta.kinds.length ? trak.udta.kinds[0] : { schemeURI: "", value: "" };
                track.language = trak.mdia.elng ? trak.mdia.elng.extended_language : trak.mdia.mdhd.languageString;
                track.nb_samples = trak.samples.length;
                track.size = trak.samples_size;
                track.bitrate = track.size * 8 * track.timescale / track.samples_duration;
                if (sample_desc.isAudio()) {
                  track.type = "audio";
                  movie.audioTracks.push(track);
                  track.audio = {};
                  track.audio.sample_rate = sample_desc.getSampleRate();
                  track.audio.channel_count = sample_desc.getChannelCount();
                  track.audio.sample_size = sample_desc.getSampleSize();
                } else if (sample_desc.isVideo()) {
                  track.type = "video";
                  movie.videoTracks.push(track);
                  track.video = {};
                  track.video.width = sample_desc.getWidth();
                  track.video.height = sample_desc.getHeight();
                } else if (sample_desc.isSubtitle()) {
                  track.type = "subtitles";
                  movie.subtitleTracks.push(track);
                } else if (sample_desc.isHint()) {
                  track.type = "metadata";
                  movie.hintTracks.push(track);
                } else if (sample_desc.isMetadata()) {
                  track.type = "metadata";
                  movie.metadataTracks.push(track);
                } else {
                  track.type = "metadata";
                  movie.otherTracks.push(track);
                }
              }
            } else {
              movie.hasMoov = false;
            }
            movie.mime = "";
            if (movie.hasMoov && movie.tracks) {
              if (movie.videoTracks && movie.videoTracks.length > 0) {
                movie.mime += 'video/mp4; codecs="';
              } else if (movie.audioTracks && movie.audioTracks.length > 0) {
                movie.mime += 'audio/mp4; codecs="';
              } else {
                movie.mime += 'application/mp4; codecs="';
              }
              for (i2 = 0; i2 < movie.tracks.length; i2++) {
                if (i2 !== 0) movie.mime += ",";
                movie.mime += movie.tracks[i2].codec;
              }
              movie.mime += '"; profiles="';
              movie.mime += this.ftyp.compatible_brands.join();
              movie.mime += '"';
            }
            return movie;
          };
          ISOFile.prototype.setNextSeekPositionFromSample = function(sample) {
            if (!sample) {
              return;
            }
            if (this.nextSeekPosition) {
              this.nextSeekPosition = Math.min(sample.offset + sample.alreadyRead, this.nextSeekPosition);
            } else {
              this.nextSeekPosition = sample.offset + sample.alreadyRead;
            }
          };
          ISOFile.prototype.processSamples = function(last) {
            var i2;
            var trak;
            if (!this.sampleProcessingStarted) return;
            if (this.isFragmentationInitialized && this.onSegment !== null) {
              for (i2 = 0; i2 < this.fragmentedTracks.length; i2++) {
                var fragTrak = this.fragmentedTracks[i2];
                trak = fragTrak.trak;
                while (trak.nextSample < trak.samples.length && this.sampleProcessingStarted) {
                  Log.debug("ISOFile", "Creating media fragment on track #" + fragTrak.id + " for sample " + trak.nextSample);
                  var result = this.createFragment(fragTrak.id, trak.nextSample, fragTrak.segmentStream);
                  if (result) {
                    fragTrak.segmentStream = result;
                    trak.nextSample++;
                  } else {
                    break;
                  }
                  if (trak.nextSample % fragTrak.nb_samples === 0 || (last || trak.nextSample >= trak.samples.length)) {
                    Log.info("ISOFile", "Sending fragmented data on track #" + fragTrak.id + " for samples [" + Math.max(0, trak.nextSample - fragTrak.nb_samples) + "," + (trak.nextSample - 1) + "]");
                    Log.info("ISOFile", "Sample data size in memory: " + this.getAllocatedSampleDataSize());
                    if (this.onSegment) {
                      this.onSegment(fragTrak.id, fragTrak.user, fragTrak.segmentStream.buffer, trak.nextSample, last || trak.nextSample >= trak.samples.length);
                    }
                    fragTrak.segmentStream = null;
                    if (fragTrak !== this.fragmentedTracks[i2]) {
                      break;
                    }
                  }
                }
              }
            }
            if (this.onSamples !== null) {
              for (i2 = 0; i2 < this.extractedTracks.length; i2++) {
                var extractTrak = this.extractedTracks[i2];
                trak = extractTrak.trak;
                while (trak.nextSample < trak.samples.length && this.sampleProcessingStarted) {
                  Log.debug("ISOFile", "Exporting on track #" + extractTrak.id + " sample #" + trak.nextSample);
                  var sample = this.getSample(trak, trak.nextSample);
                  if (sample) {
                    trak.nextSample++;
                    extractTrak.samples.push(sample);
                  } else {
                    this.setNextSeekPositionFromSample(trak.samples[trak.nextSample]);
                    break;
                  }
                  if (trak.nextSample % extractTrak.nb_samples === 0 || trak.nextSample >= trak.samples.length) {
                    Log.debug("ISOFile", "Sending samples on track #" + extractTrak.id + " for sample " + trak.nextSample);
                    if (this.onSamples) {
                      this.onSamples(extractTrak.id, extractTrak.user, extractTrak.samples);
                    }
                    extractTrak.samples = [];
                    if (extractTrak !== this.extractedTracks[i2]) {
                      break;
                    }
                  }
                }
              }
            }
          };
          ISOFile.prototype.getBox = function(type) {
            var result = this.getBoxes(type, true);
            return result.length ? result[0] : null;
          };
          ISOFile.prototype.getBoxes = function(type, returnEarly) {
            var result = [];
            ISOFile._sweep.call(this, type, result, returnEarly);
            return result;
          };
          ISOFile._sweep = function(type, result, returnEarly) {
            if (this.type && this.type == type) result.push(this);
            for (var box2 in this.boxes) {
              if (result.length && returnEarly) return;
              ISOFile._sweep.call(this.boxes[box2], type, result, returnEarly);
            }
          };
          ISOFile.prototype.getTrackSamplesInfo = function(track_id) {
            var track = this.getTrackById(track_id);
            if (track) {
              return track.samples;
            } else {
              return;
            }
          };
          ISOFile.prototype.getTrackSample = function(track_id, number) {
            var track = this.getTrackById(track_id);
            var sample = this.getSample(track, number);
            return sample;
          };
          ISOFile.prototype.releaseUsedSamples = function(id, sampleNum) {
            var size = 0;
            var trak = this.getTrackById(id);
            if (!trak.lastValidSample) trak.lastValidSample = 0;
            for (var i2 = trak.lastValidSample; i2 < sampleNum; i2++) {
              size += this.releaseSample(trak, i2);
            }
            Log.info("ISOFile", "Track #" + id + " released samples up to " + sampleNum + " (released size: " + size + ", remaining: " + this.samplesDataSize + ")");
            trak.lastValidSample = sampleNum;
          };
          ISOFile.prototype.start = function() {
            this.sampleProcessingStarted = true;
            this.processSamples(false);
          };
          ISOFile.prototype.stop = function() {
            this.sampleProcessingStarted = false;
          };
          ISOFile.prototype.flush = function() {
            Log.info("ISOFile", "Flushing remaining samples");
            this.updateSampleLists();
            this.processSamples(true);
            this.stream.cleanBuffers();
            this.stream.logBufferLevel(true);
          };
          ISOFile.prototype.seekTrack = function(time, useRap, trak) {
            var j;
            var sample;
            var seek_offset = Infinity;
            var rap_seek_sample_num = 0;
            var seek_sample_num = 0;
            var timescale;
            if (trak.samples.length === 0) {
              Log.info("ISOFile", "No sample in track, cannot seek! Using time " + Log.getDurationString(0, 1) + " and offset: 0");
              return { offset: 0, time: 0 };
            }
            for (j = 0; j < trak.samples.length; j++) {
              sample = trak.samples[j];
              if (j === 0) {
                seek_sample_num = 0;
                timescale = sample.timescale;
              } else if (sample.cts > time * sample.timescale) {
                seek_sample_num = j - 1;
                break;
              }
              if (useRap && sample.is_sync) {
                rap_seek_sample_num = j;
              }
            }
            if (useRap) {
              seek_sample_num = rap_seek_sample_num;
            }
            time = trak.samples[seek_sample_num].cts;
            trak.nextSample = seek_sample_num;
            while (trak.samples[seek_sample_num].alreadyRead === trak.samples[seek_sample_num].size) {
              if (!trak.samples[seek_sample_num + 1]) {
                break;
              }
              seek_sample_num++;
            }
            seek_offset = trak.samples[seek_sample_num].offset + trak.samples[seek_sample_num].alreadyRead;
            Log.info("ISOFile", "Seeking to " + (useRap ? "RAP" : "") + " sample #" + trak.nextSample + " on track " + trak.tkhd.track_id + ", time " + Log.getDurationString(time, timescale) + " and offset: " + seek_offset);
            return { offset: seek_offset, time: time / timescale };
          };
          ISOFile.prototype.getTrackDuration = function(trak) {
            var sample;
            if (!trak.samples) {
              return Infinity;
            }
            sample = trak.samples[trak.samples.length - 1];
            return (sample.cts + sample.duration) / sample.timescale;
          };
          ISOFile.prototype.seek = function(time, useRap) {
            var moov = this.moov;
            var trak;
            var trak_seek_info;
            var i2;
            var seek_info = { offset: Infinity, time: Infinity };
            if (!this.moov) {
              throw "Cannot seek: moov not received!";
            } else {
              for (i2 = 0; i2 < moov.traks.length; i2++) {
                trak = moov.traks[i2];
                if (time > this.getTrackDuration(trak)) {
                  continue;
                }
                trak_seek_info = this.seekTrack(time, useRap, trak);
                if (trak_seek_info.offset < seek_info.offset) {
                  seek_info.offset = trak_seek_info.offset;
                }
                if (trak_seek_info.time < seek_info.time) {
                  seek_info.time = trak_seek_info.time;
                }
              }
              Log.info("ISOFile", "Seeking at time " + Log.getDurationString(seek_info.time, 1) + " needs a buffer with a fileStart position of " + seek_info.offset);
              if (seek_info.offset === Infinity) {
                seek_info = { offset: this.nextParsePosition, time: 0 };
              } else {
                seek_info.offset = this.stream.getEndFilePositionAfter(seek_info.offset);
              }
              Log.info("ISOFile", "Adjusted seek position (after checking data already in buffer): " + seek_info.offset);
              return seek_info;
            }
          };
          ISOFile.prototype.equal = function(b) {
            var box_index = 0;
            while (box_index < this.boxes.length && box_index < b.boxes.length) {
              var a_box = this.boxes[box_index];
              var b_box = b.boxes[box_index];
              if (!BoxParser.boxEqual(a_box, b_box)) {
                return false;
              }
              box_index++;
            }
            return true;
          };
          {
            exports.ISOFile = ISOFile;
          }
          ISOFile.prototype.lastBoxStartPosition = 0;
          ISOFile.prototype.parsingMdat = null;
          ISOFile.prototype.nextParsePosition = 0;
          ISOFile.prototype.discardMdatData = false;
          ISOFile.prototype.processIncompleteBox = function(ret2) {
            var box2;
            var merged;
            var found;
            if (ret2.type === "mdat") {
              box2 = new BoxParser[ret2.type + "Box"](ret2.size);
              this.parsingMdat = box2;
              this.boxes.push(box2);
              this.mdats.push(box2);
              box2.start = ret2.start;
              box2.hdr_size = ret2.hdr_size;
              this.stream.addUsedBytes(box2.hdr_size);
              this.lastBoxStartPosition = box2.start + box2.size;
              found = this.stream.seek(box2.start + box2.size, false, this.discardMdatData);
              if (found) {
                this.parsingMdat = null;
                return true;
              } else {
                if (!this.moovStartFound) {
                  this.nextParsePosition = box2.start + box2.size;
                } else {
                  this.nextParsePosition = this.stream.findEndContiguousBuf();
                }
                return false;
              }
            } else {
              if (ret2.type === "moov") {
                this.moovStartFound = true;
                if (this.mdats.length === 0) {
                  this.isProgressive = true;
                }
              }
              merged = this.stream.mergeNextBuffer ? this.stream.mergeNextBuffer() : false;
              if (merged) {
                this.nextParsePosition = this.stream.getEndPosition();
                return true;
              } else {
                if (!ret2.type) {
                  this.nextParsePosition = this.stream.getEndPosition();
                } else {
                  if (this.moovStartFound) {
                    this.nextParsePosition = this.stream.getEndPosition();
                  } else {
                    this.nextParsePosition = this.stream.getPosition() + ret2.size;
                  }
                }
                return false;
              }
            }
          };
          ISOFile.prototype.hasIncompleteMdat = function() {
            return this.parsingMdat !== null;
          };
          ISOFile.prototype.processIncompleteMdat = function() {
            var box2;
            var found;
            box2 = this.parsingMdat;
            found = this.stream.seek(box2.start + box2.size, false, this.discardMdatData);
            if (found) {
              Log.debug("ISOFile", "Found 'mdat' end in buffered data");
              this.parsingMdat = null;
              return true;
            } else {
              this.nextParsePosition = this.stream.findEndContiguousBuf();
              return false;
            }
          };
          ISOFile.prototype.restoreParsePosition = function() {
            return this.stream.seek(this.lastBoxStartPosition, true, this.discardMdatData);
          };
          ISOFile.prototype.saveParsePosition = function() {
            this.lastBoxStartPosition = this.stream.getPosition();
          };
          ISOFile.prototype.updateUsedBytes = function(box2, ret2) {
            if (this.stream.addUsedBytes) {
              if (box2.type === "mdat") {
                this.stream.addUsedBytes(box2.hdr_size);
                if (this.discardMdatData) {
                  this.stream.addUsedBytes(box2.size - box2.hdr_size);
                }
              } else {
                this.stream.addUsedBytes(box2.size);
              }
            }
          };
          ISOFile.prototype.add = BoxParser.Box.prototype.add;
          ISOFile.prototype.addBox = BoxParser.Box.prototype.addBox;
          ISOFile.prototype.init = function(_options) {
            var options = _options || {};
            this.add("ftyp").set("major_brand", options.brands && options.brands[0] || "iso4").set("minor_version", 0).set("compatible_brands", options.brands || ["iso4"]);
            var moov = this.add("moov");
            moov.add("mvhd").set("timescale", options.timescale || 600).set("rate", options.rate || 1 << 16).set("creation_time", 0).set("modification_time", 0).set("duration", options.duration || 0).set("volume", options.width ? 0 : 256).set("matrix", [1 << 16, 0, 0, 0, 1 << 16, 0, 0, 0, 1073741824]).set("next_track_id", 1);
            moov.add("mvex");
            return this;
          };
          ISOFile.prototype.addTrack = function(_options) {
            if (!this.moov) {
              this.init(_options);
            }
            var options = _options || {};
            options.width = options.width || 320;
            options.height = options.height || 320;
            options.id = options.id || this.moov.mvhd.next_track_id;
            options.type = options.type || "avc1";
            var trak = this.moov.add("trak");
            this.moov.mvhd.next_track_id = options.id + 1;
            trak.add("tkhd").set("flags", BoxParser.TKHD_FLAG_ENABLED | BoxParser.TKHD_FLAG_IN_MOVIE | BoxParser.TKHD_FLAG_IN_PREVIEW).set("creation_time", 0).set("modification_time", 0).set("track_id", options.id).set("duration", options.duration || 0).set("layer", options.layer || 0).set("alternate_group", 0).set("volume", 1).set("matrix", [0, 0, 0, 0, 0, 0, 0, 0, 0]).set("width", options.width << 16).set("height", options.height << 16);
            var mdia = trak.add("mdia");
            mdia.add("mdhd").set("creation_time", 0).set("modification_time", 0).set("timescale", options.timescale || 1).set("duration", options.media_duration || 0).set("language", options.language || "und");
            mdia.add("hdlr").set("handler", options.hdlr || "vide").set("name", options.name || "Track created with MP4Box.js");
            mdia.add("elng").set("extended_language", options.language || "fr-FR");
            var minf = mdia.add("minf");
            if (BoxParser[options.type + "SampleEntry"] === undefined) return;
            var sample_description_entry = new BoxParser[options.type + "SampleEntry"]();
            sample_description_entry.data_reference_index = 1;
            var media_type = "";
            for (var mediaType in BoxParser.sampleEntryCodes) {
              var codes = BoxParser.sampleEntryCodes[mediaType];
              for (var i2 = 0; i2 < codes.length; i2++) {
                if (codes.indexOf(options.type) > -1) {
                  media_type = mediaType;
                  break;
                }
              }
            }
            switch (media_type) {
              case "Visual":
                minf.add("vmhd").set("graphicsmode", 0).set("opcolor", [0, 0, 0]);
                sample_description_entry.set("width", options.width).set("height", options.height).set("horizresolution", 72 << 16).set("vertresolution", 72 << 16).set("frame_count", 1).set("compressorname", options.type + " Compressor").set("depth", 24);
                if (options.avcDecoderConfigRecord) {
                  var avcC = new BoxParser.avcCBox();
                  avcC.parse(new MP4BoxStream(options.avcDecoderConfigRecord));
                  sample_description_entry.addBox(avcC);
                } else if (options.hevcDecoderConfigRecord) {
                  var hvcC = new BoxParser.hvcCBox();
                  hvcC.parse(new MP4BoxStream(options.hevcDecoderConfigRecord));
                  sample_description_entry.addBox(hvcC);
                }
                break;
              case "Audio":
                minf.add("smhd").set("balance", options.balance || 0);
                sample_description_entry.set("channel_count", options.channel_count || 2).set("samplesize", options.samplesize || 16).set("samplerate", options.samplerate || 1 << 16);
                break;
              case "Hint":
                minf.add("hmhd");
                break;
              case "Subtitle":
                minf.add("sthd");
                switch (options.type) {
                  case "stpp":
                    sample_description_entry.set("namespace", options.namespace || "nonamespace").set("schema_location", options.schema_location || "").set("auxiliary_mime_types", options.auxiliary_mime_types || "");
                    break;
                }
                break;
              case "Metadata":
                minf.add("nmhd");
                break;
              case "System":
                minf.add("nmhd");
                break;
              default:
                minf.add("nmhd");
                break;
            }
            if (options.description) {
              sample_description_entry.addBox(options.description);
            }
            if (options.description_boxes) {
              options.description_boxes.forEach(function(b) {
                sample_description_entry.addBox(b);
              });
            }
            minf.add("dinf").add("dref").addEntry(new BoxParser["url Box"]().set("flags", 1));
            var stbl = minf.add("stbl");
            stbl.add("stsd").addEntry(sample_description_entry);
            stbl.add("stts").set("sample_counts", []).set("sample_deltas", []);
            stbl.add("stsc").set("first_chunk", []).set("samples_per_chunk", []).set("sample_description_index", []);
            stbl.add("stco").set("chunk_offsets", []);
            stbl.add("stsz").set("sample_sizes", []);
            this.moov.mvex.add("trex").set("track_id", options.id).set("default_sample_description_index", options.default_sample_description_index || 1).set("default_sample_duration", options.default_sample_duration || 0).set("default_sample_size", options.default_sample_size || 0).set("default_sample_flags", options.default_sample_flags || 0);
            this.buildTrakSampleLists(trak);
            return options.id;
          };
          BoxParser.Box.prototype.computeSize = function(stream_) {
            var stream = stream_ || new DataStream();
            stream.endianness = DataStream.BIG_ENDIAN;
            this.write(stream);
          };
          ISOFile.prototype.addSample = function(track_id, data, _options) {
            var options = _options || {};
            var sample = {};
            var trak = this.getTrackById(track_id);
            if (trak === null) return;
            sample.number = trak.samples.length;
            sample.track_id = trak.tkhd.track_id;
            sample.timescale = trak.mdia.mdhd.timescale;
            sample.description_index = options.sample_description_index ? options.sample_description_index - 1 : 0;
            sample.description = trak.mdia.minf.stbl.stsd.entries[sample.description_index];
            sample.data = data;
            sample.size = data.byteLength;
            sample.alreadyRead = sample.size;
            sample.duration = options.duration || 1;
            sample.cts = options.cts || 0;
            sample.dts = options.dts || 0;
            sample.is_sync = options.is_sync || false;
            sample.is_leading = options.is_leading || 0;
            sample.depends_on = options.depends_on || 0;
            sample.is_depended_on = options.is_depended_on || 0;
            sample.has_redundancy = options.has_redundancy || 0;
            sample.degradation_priority = options.degradation_priority || 0;
            sample.offset = 0;
            sample.subsamples = options.subsamples;
            trak.samples.push(sample);
            trak.samples_size += sample.size;
            trak.samples_duration += sample.duration;
            if (trak.first_dts === undefined) {
              trak.first_dts = options.dts;
            }
            this.processSamples();
            var moof = this.createSingleSampleMoof(sample);
            this.addBox(moof);
            moof.computeSize();
            moof.trafs[0].truns[0].data_offset = moof.size + 8;
            this.add("mdat").data = new Uint8Array(data);
            return sample;
          };
          ISOFile.prototype.createSingleSampleMoof = function(sample) {
            var sample_flags = 0;
            if (sample.is_sync)
              sample_flags = 1 << 25;
            else
              sample_flags = 1 << 16;
            var moof = new BoxParser.moofBox();
            moof.add("mfhd").set("sequence_number", this.nextMoofNumber);
            this.nextMoofNumber++;
            var traf = moof.add("traf");
            var trak = this.getTrackById(sample.track_id);
            traf.add("tfhd").set("track_id", sample.track_id).set("flags", BoxParser.TFHD_FLAG_DEFAULT_BASE_IS_MOOF);
            traf.add("tfdt").set("baseMediaDecodeTime", sample.dts - (trak.first_dts || 0));
            traf.add("trun").set("flags", BoxParser.TRUN_FLAGS_DATA_OFFSET | BoxParser.TRUN_FLAGS_DURATION | BoxParser.TRUN_FLAGS_SIZE | BoxParser.TRUN_FLAGS_FLAGS | BoxParser.TRUN_FLAGS_CTS_OFFSET).set("data_offset", 0).set("first_sample_flags", 0).set("sample_count", 1).set("sample_duration", [sample.duration]).set("sample_size", [sample.size]).set("sample_flags", [sample_flags]).set("sample_composition_time_offset", [sample.cts - sample.dts]);
            return moof;
          };
          ISOFile.prototype.lastMoofIndex = 0;
          ISOFile.prototype.samplesDataSize = 0;
          ISOFile.prototype.resetTables = function() {
            var i2;
            var trak, stco, stsc, stsz, stts, ctts, stss;
            this.initial_duration = this.moov.mvhd.duration;
            this.moov.mvhd.duration = 0;
            for (i2 = 0; i2 < this.moov.traks.length; i2++) {
              trak = this.moov.traks[i2];
              trak.tkhd.duration = 0;
              trak.mdia.mdhd.duration = 0;
              stco = trak.mdia.minf.stbl.stco || trak.mdia.minf.stbl.co64;
              stco.chunk_offsets = [];
              stsc = trak.mdia.minf.stbl.stsc;
              stsc.first_chunk = [];
              stsc.samples_per_chunk = [];
              stsc.sample_description_index = [];
              stsz = trak.mdia.minf.stbl.stsz || trak.mdia.minf.stbl.stz2;
              stsz.sample_sizes = [];
              stts = trak.mdia.minf.stbl.stts;
              stts.sample_counts = [];
              stts.sample_deltas = [];
              ctts = trak.mdia.minf.stbl.ctts;
              if (ctts) {
                ctts.sample_counts = [];
                ctts.sample_offsets = [];
              }
              stss = trak.mdia.minf.stbl.stss;
              var k = trak.mdia.minf.stbl.boxes.indexOf(stss);
              if (k != -1) trak.mdia.minf.stbl.boxes[k] = null;
            }
          };
          ISOFile.initSampleGroups = function(trak, traf, sbgps, trak_sgpds, traf_sgpds) {
            var l;
            var k;
            var sample_group_info;
            var sample_group_key;
            function SampleGroupInfo(_type, _parameter, _sbgp) {
              this.grouping_type = _type;
              this.grouping_type_parameter = _parameter;
              this.sbgp = _sbgp;
              this.last_sample_in_run = -1;
              this.entry_index = -1;
            }
            if (traf) {
              traf.sample_groups_info = [];
            }
            if (!trak.sample_groups_info) {
              trak.sample_groups_info = [];
            }
            for (k = 0; k < sbgps.length; k++) {
              sample_group_key = sbgps[k].grouping_type + "/" + sbgps[k].grouping_type_parameter;
              sample_group_info = new SampleGroupInfo(sbgps[k].grouping_type, sbgps[k].grouping_type_parameter, sbgps[k]);
              if (traf) {
                traf.sample_groups_info[sample_group_key] = sample_group_info;
              }
              if (!trak.sample_groups_info[sample_group_key]) {
                trak.sample_groups_info[sample_group_key] = sample_group_info;
              }
              for (l = 0; l < trak_sgpds.length; l++) {
                if (trak_sgpds[l].grouping_type === sbgps[k].grouping_type) {
                  sample_group_info.description = trak_sgpds[l];
                  sample_group_info.description.used = true;
                }
              }
              if (traf_sgpds) {
                for (l = 0; l < traf_sgpds.length; l++) {
                  if (traf_sgpds[l].grouping_type === sbgps[k].grouping_type) {
                    sample_group_info.fragment_description = traf_sgpds[l];
                    sample_group_info.fragment_description.used = true;
                    sample_group_info.is_fragment = true;
                  }
                }
              }
            }
            if (!traf) {
              for (k = 0; k < trak_sgpds.length; k++) {
                if (!trak_sgpds[k].used && trak_sgpds[k].version >= 2) {
                  sample_group_key = trak_sgpds[k].grouping_type + "/0";
                  sample_group_info = new SampleGroupInfo(trak_sgpds[k].grouping_type, 0);
                  if (!trak.sample_groups_info[sample_group_key]) {
                    trak.sample_groups_info[sample_group_key] = sample_group_info;
                  }
                }
              }
            } else {
              if (traf_sgpds) {
                for (k = 0; k < traf_sgpds.length; k++) {
                  if (!traf_sgpds[k].used && traf_sgpds[k].version >= 2) {
                    sample_group_key = traf_sgpds[k].grouping_type + "/0";
                    sample_group_info = new SampleGroupInfo(traf_sgpds[k].grouping_type, 0);
                    sample_group_info.is_fragment = true;
                    if (!traf.sample_groups_info[sample_group_key]) {
                      traf.sample_groups_info[sample_group_key] = sample_group_info;
                    }
                  }
                }
              }
            }
          };
          ISOFile.setSampleGroupProperties = function(trak, sample, sample_number, sample_groups_info) {
            var k;
            var index;
            sample.sample_groups = [];
            for (k in sample_groups_info) {
              sample.sample_groups[k] = {};
              sample.sample_groups[k].grouping_type = sample_groups_info[k].grouping_type;
              sample.sample_groups[k].grouping_type_parameter = sample_groups_info[k].grouping_type_parameter;
              if (sample_number >= sample_groups_info[k].last_sample_in_run) {
                if (sample_groups_info[k].last_sample_in_run < 0) {
                  sample_groups_info[k].last_sample_in_run = 0;
                }
                sample_groups_info[k].entry_index++;
                if (sample_groups_info[k].entry_index <= sample_groups_info[k].sbgp.entries.length - 1) {
                  sample_groups_info[k].last_sample_in_run += sample_groups_info[k].sbgp.entries[sample_groups_info[k].entry_index].sample_count;
                }
              }
              if (sample_groups_info[k].entry_index <= sample_groups_info[k].sbgp.entries.length - 1) {
                sample.sample_groups[k].group_description_index = sample_groups_info[k].sbgp.entries[sample_groups_info[k].entry_index].group_description_index;
              } else {
                sample.sample_groups[k].group_description_index = -1;
              }
              if (sample.sample_groups[k].group_description_index !== 0) {
                var description;
                if (sample_groups_info[k].fragment_description) {
                  description = sample_groups_info[k].fragment_description;
                } else {
                  description = sample_groups_info[k].description;
                }
                if (sample.sample_groups[k].group_description_index > 0) {
                  if (sample.sample_groups[k].group_description_index > 65535) {
                    index = (sample.sample_groups[k].group_description_index >> 16) - 1;
                  } else {
                    index = sample.sample_groups[k].group_description_index - 1;
                  }
                  if (description && index >= 0) {
                    sample.sample_groups[k].description = description.entries[index];
                  }
                } else {
                  if (description && description.version >= 2) {
                    if (description.default_group_description_index > 0) {
                      sample.sample_groups[k].description = description.entries[description.default_group_description_index - 1];
                    }
                  }
                }
              }
            }
          };
          ISOFile.process_sdtp = function(sdtp, sample, number) {
            if (!sample) {
              return;
            }
            if (sdtp) {
              sample.is_leading = sdtp.is_leading[number];
              sample.depends_on = sdtp.sample_depends_on[number];
              sample.is_depended_on = sdtp.sample_is_depended_on[number];
              sample.has_redundancy = sdtp.sample_has_redundancy[number];
            } else {
              sample.is_leading = 0;
              sample.depends_on = 0;
              sample.is_depended_on = 0;
              sample.has_redundancy = 0;
            }
          };
          ISOFile.prototype.buildSampleLists = function() {
            var i2;
            var trak;
            for (i2 = 0; i2 < this.moov.traks.length; i2++) {
              trak = this.moov.traks[i2];
              this.buildTrakSampleLists(trak);
            }
          };
          ISOFile.prototype.buildTrakSampleLists = function(trak) {
            var j;
            var stco, stsc, stsz, stts, ctts, stss, stsd, subs, sbgps, sgpds, stdp;
            var chunk_run_index, chunk_index, last_chunk_in_run, offset_in_chunk, last_sample_in_chunk;
            var last_sample_in_stts_run, stts_run_index, last_sample_in_ctts_run, ctts_run_index, last_stss_index, subs_entry_index, last_subs_sample_index;
            trak.samples = [];
            trak.samples_duration = 0;
            trak.samples_size = 0;
            stco = trak.mdia.minf.stbl.stco || trak.mdia.minf.stbl.co64;
            stsc = trak.mdia.minf.stbl.stsc;
            stsz = trak.mdia.minf.stbl.stsz || trak.mdia.minf.stbl.stz2;
            stts = trak.mdia.minf.stbl.stts;
            ctts = trak.mdia.minf.stbl.ctts;
            stss = trak.mdia.minf.stbl.stss;
            stsd = trak.mdia.minf.stbl.stsd;
            subs = trak.mdia.minf.stbl.subs;
            stdp = trak.mdia.minf.stbl.stdp;
            sbgps = trak.mdia.minf.stbl.sbgps;
            sgpds = trak.mdia.minf.stbl.sgpds;
            last_sample_in_stts_run = -1;
            stts_run_index = -1;
            last_sample_in_ctts_run = -1;
            ctts_run_index = -1;
            last_stss_index = 0;
            subs_entry_index = 0;
            last_subs_sample_index = 0;
            ISOFile.initSampleGroups(trak, null, sbgps, sgpds);
            if (typeof stsz === "undefined") {
              return;
            }
            for (j = 0; j < stsz.sample_sizes.length; j++) {
              var sample = {};
              sample.number = j;
              sample.track_id = trak.tkhd.track_id;
              sample.timescale = trak.mdia.mdhd.timescale;
              sample.alreadyRead = 0;
              trak.samples[j] = sample;
              sample.size = stsz.sample_sizes[j];
              trak.samples_size += sample.size;
              if (j === 0) {
                chunk_index = 1;
                chunk_run_index = 0;
                sample.chunk_index = chunk_index;
                sample.chunk_run_index = chunk_run_index;
                last_sample_in_chunk = stsc.samples_per_chunk[chunk_run_index];
                offset_in_chunk = 0;
                if (chunk_run_index + 1 < stsc.first_chunk.length) {
                  last_chunk_in_run = stsc.first_chunk[chunk_run_index + 1] - 1;
                } else {
                  last_chunk_in_run = Infinity;
                }
              } else {
                if (j < last_sample_in_chunk) {
                  sample.chunk_index = chunk_index;
                  sample.chunk_run_index = chunk_run_index;
                } else {
                  chunk_index++;
                  sample.chunk_index = chunk_index;
                  offset_in_chunk = 0;
                  if (chunk_index <= last_chunk_in_run) ;
                  else {
                    chunk_run_index++;
                    if (chunk_run_index + 1 < stsc.first_chunk.length) {
                      last_chunk_in_run = stsc.first_chunk[chunk_run_index + 1] - 1;
                    } else {
                      last_chunk_in_run = Infinity;
                    }
                  }
                  sample.chunk_run_index = chunk_run_index;
                  last_sample_in_chunk += stsc.samples_per_chunk[chunk_run_index];
                }
              }
              sample.description_index = stsc.sample_description_index[sample.chunk_run_index] - 1;
              sample.description = stsd.entries[sample.description_index];
              sample.offset = stco.chunk_offsets[sample.chunk_index - 1] + offset_in_chunk;
              offset_in_chunk += sample.size;
              if (j > last_sample_in_stts_run) {
                stts_run_index++;
                if (last_sample_in_stts_run < 0) {
                  last_sample_in_stts_run = 0;
                }
                last_sample_in_stts_run += stts.sample_counts[stts_run_index];
              }
              if (j > 0) {
                trak.samples[j - 1].duration = stts.sample_deltas[stts_run_index];
                trak.samples_duration += trak.samples[j - 1].duration;
                sample.dts = trak.samples[j - 1].dts + trak.samples[j - 1].duration;
              } else {
                sample.dts = 0;
              }
              if (ctts) {
                if (j >= last_sample_in_ctts_run) {
                  ctts_run_index++;
                  if (last_sample_in_ctts_run < 0) {
                    last_sample_in_ctts_run = 0;
                  }
                  last_sample_in_ctts_run += ctts.sample_counts[ctts_run_index];
                }
                sample.cts = trak.samples[j].dts + ctts.sample_offsets[ctts_run_index];
              } else {
                sample.cts = sample.dts;
              }
              if (stss) {
                if (j == stss.sample_numbers[last_stss_index] - 1) {
                  sample.is_sync = true;
                  last_stss_index++;
                } else {
                  sample.is_sync = false;
                  sample.degradation_priority = 0;
                }
                if (subs) {
                  if (subs.entries[subs_entry_index].sample_delta + last_subs_sample_index == j + 1) {
                    sample.subsamples = subs.entries[subs_entry_index].subsamples;
                    last_subs_sample_index += subs.entries[subs_entry_index].sample_delta;
                    subs_entry_index++;
                  }
                }
              } else {
                sample.is_sync = true;
              }
              ISOFile.process_sdtp(trak.mdia.minf.stbl.sdtp, sample, sample.number);
              if (stdp) {
                sample.degradation_priority = stdp.priority[j];
              } else {
                sample.degradation_priority = 0;
              }
              if (subs) {
                if (subs.entries[subs_entry_index].sample_delta + last_subs_sample_index == j) {
                  sample.subsamples = subs.entries[subs_entry_index].subsamples;
                  last_subs_sample_index += subs.entries[subs_entry_index].sample_delta;
                }
              }
              if (sbgps.length > 0 || sgpds.length > 0) {
                ISOFile.setSampleGroupProperties(trak, sample, j, trak.sample_groups_info);
              }
            }
            if (j > 0) {
              trak.samples[j - 1].duration = Math.max(trak.mdia.mdhd.duration - trak.samples[j - 1].dts, 0);
              trak.samples_duration += trak.samples[j - 1].duration;
            }
          };
          ISOFile.prototype.updateSampleLists = function() {
            var i2, j, k;
            var default_sample_description_index, default_sample_duration, default_sample_size, default_sample_flags;
            var last_run_position;
            var box2, moof, traf, trak, trex;
            var sample;
            var sample_flags;
            if (this.moov === undefined) {
              return;
            }
            while (this.lastMoofIndex < this.moofs.length) {
              box2 = this.moofs[this.lastMoofIndex];
              this.lastMoofIndex++;
              if (box2.type == "moof") {
                moof = box2;
                for (i2 = 0; i2 < moof.trafs.length; i2++) {
                  traf = moof.trafs[i2];
                  trak = this.getTrackById(traf.tfhd.track_id);
                  trex = this.getTrexById(traf.tfhd.track_id);
                  if (traf.tfhd.flags & BoxParser.TFHD_FLAG_SAMPLE_DESC) {
                    default_sample_description_index = traf.tfhd.default_sample_description_index;
                  } else {
                    default_sample_description_index = trex ? trex.default_sample_description_index : 1;
                  }
                  if (traf.tfhd.flags & BoxParser.TFHD_FLAG_SAMPLE_DUR) {
                    default_sample_duration = traf.tfhd.default_sample_duration;
                  } else {
                    default_sample_duration = trex ? trex.default_sample_duration : 0;
                  }
                  if (traf.tfhd.flags & BoxParser.TFHD_FLAG_SAMPLE_SIZE) {
                    default_sample_size = traf.tfhd.default_sample_size;
                  } else {
                    default_sample_size = trex ? trex.default_sample_size : 0;
                  }
                  if (traf.tfhd.flags & BoxParser.TFHD_FLAG_SAMPLE_FLAGS) {
                    default_sample_flags = traf.tfhd.default_sample_flags;
                  } else {
                    default_sample_flags = trex ? trex.default_sample_flags : 0;
                  }
                  traf.sample_number = 0;
                  if (traf.sbgps.length > 0) {
                    ISOFile.initSampleGroups(trak, traf, traf.sbgps, trak.mdia.minf.stbl.sgpds, traf.sgpds);
                  }
                  for (j = 0; j < traf.truns.length; j++) {
                    var trun = traf.truns[j];
                    for (k = 0; k < trun.sample_count; k++) {
                      sample = {};
                      sample.moof_number = this.lastMoofIndex;
                      sample.number_in_traf = traf.sample_number;
                      traf.sample_number++;
                      sample.number = trak.samples.length;
                      traf.first_sample_index = trak.samples.length;
                      trak.samples.push(sample);
                      sample.track_id = trak.tkhd.track_id;
                      sample.timescale = trak.mdia.mdhd.timescale;
                      sample.description_index = default_sample_description_index - 1;
                      sample.description = trak.mdia.minf.stbl.stsd.entries[sample.description_index];
                      sample.size = default_sample_size;
                      if (trun.flags & BoxParser.TRUN_FLAGS_SIZE) {
                        sample.size = trun.sample_size[k];
                      }
                      trak.samples_size += sample.size;
                      sample.duration = default_sample_duration;
                      if (trun.flags & BoxParser.TRUN_FLAGS_DURATION) {
                        sample.duration = trun.sample_duration[k];
                      }
                      trak.samples_duration += sample.duration;
                      if (trak.first_traf_merged || k > 0) {
                        sample.dts = trak.samples[trak.samples.length - 2].dts + trak.samples[trak.samples.length - 2].duration;
                      } else {
                        if (traf.tfdt) {
                          sample.dts = traf.tfdt.baseMediaDecodeTime;
                        } else {
                          sample.dts = 0;
                        }
                        trak.first_traf_merged = true;
                      }
                      sample.cts = sample.dts;
                      if (trun.flags & BoxParser.TRUN_FLAGS_CTS_OFFSET) {
                        sample.cts = sample.dts + trun.sample_composition_time_offset[k];
                      }
                      sample_flags = default_sample_flags;
                      if (trun.flags & BoxParser.TRUN_FLAGS_FLAGS) {
                        sample_flags = trun.sample_flags[k];
                      } else if (k === 0 && trun.flags & BoxParser.TRUN_FLAGS_FIRST_FLAG) {
                        sample_flags = trun.first_sample_flags;
                      }
                      sample.is_sync = sample_flags >> 16 & 1 ? false : true;
                      sample.is_leading = sample_flags >> 26 & 3;
                      sample.depends_on = sample_flags >> 24 & 3;
                      sample.is_depended_on = sample_flags >> 22 & 3;
                      sample.has_redundancy = sample_flags >> 20 & 3;
                      sample.degradation_priority = sample_flags & 65535;
                      var bdop = traf.tfhd.flags & BoxParser.TFHD_FLAG_BASE_DATA_OFFSET ? true : false;
                      var dbim = traf.tfhd.flags & BoxParser.TFHD_FLAG_DEFAULT_BASE_IS_MOOF ? true : false;
                      var dop = trun.flags & BoxParser.TRUN_FLAGS_DATA_OFFSET ? true : false;
                      var bdo = 0;
                      if (!bdop) {
                        if (!dbim) {
                          if (j === 0) {
                            bdo = moof.start;
                          } else {
                            bdo = last_run_position;
                          }
                        } else {
                          bdo = moof.start;
                        }
                      } else {
                        bdo = traf.tfhd.base_data_offset;
                      }
                      if (j === 0 && k === 0) {
                        if (dop) {
                          sample.offset = bdo + trun.data_offset;
                        } else {
                          sample.offset = bdo;
                        }
                      } else {
                        sample.offset = last_run_position;
                      }
                      last_run_position = sample.offset + sample.size;
                      if (traf.sbgps.length > 0 || traf.sgpds.length > 0 || trak.mdia.minf.stbl.sbgps.length > 0 || trak.mdia.minf.stbl.sgpds.length > 0) {
                        ISOFile.setSampleGroupProperties(trak, sample, sample.number_in_traf, traf.sample_groups_info);
                      }
                    }
                  }
                  if (traf.subs) {
                    trak.has_fragment_subsamples = true;
                    var sample_index = traf.first_sample_index;
                    for (j = 0; j < traf.subs.entries.length; j++) {
                      sample_index += traf.subs.entries[j].sample_delta;
                      sample = trak.samples[sample_index - 1];
                      sample.subsamples = traf.subs.entries[j].subsamples;
                    }
                  }
                }
              }
            }
          };
          ISOFile.prototype.getSample = function(trak, sampleNum) {
            var buffer;
            var sample = trak.samples[sampleNum];
            if (!this.moov) {
              return null;
            }
            if (!sample.data) {
              sample.data = new Uint8Array(sample.size);
              sample.alreadyRead = 0;
              this.samplesDataSize += sample.size;
              Log.debug("ISOFile", "Allocating sample #" + sampleNum + " on track #" + trak.tkhd.track_id + " of size " + sample.size + " (total: " + this.samplesDataSize + ")");
            } else if (sample.alreadyRead == sample.size) {
              return sample;
            }
            while (true) {
              var index = this.stream.findPosition(true, sample.offset + sample.alreadyRead, false);
              if (index > -1) {
                buffer = this.stream.buffers[index];
                var lengthAfterStart = buffer.byteLength - (sample.offset + sample.alreadyRead - buffer.fileStart);
                if (sample.size - sample.alreadyRead <= lengthAfterStart) {
                  Log.debug("ISOFile", "Getting sample #" + sampleNum + " data (alreadyRead: " + sample.alreadyRead + " offset: " + (sample.offset + sample.alreadyRead - buffer.fileStart) + " read size: " + (sample.size - sample.alreadyRead) + " full size: " + sample.size + ")");
                  DataStream.memcpy(
                    sample.data.buffer,
                    sample.alreadyRead,
                    buffer,
                    sample.offset + sample.alreadyRead - buffer.fileStart,
                    sample.size - sample.alreadyRead
                  );
                  buffer.usedBytes += sample.size - sample.alreadyRead;
                  this.stream.logBufferLevel();
                  sample.alreadyRead = sample.size;
                  return sample;
                } else {
                  if (lengthAfterStart === 0) return null;
                  Log.debug("ISOFile", "Getting sample #" + sampleNum + " partial data (alreadyRead: " + sample.alreadyRead + " offset: " + (sample.offset + sample.alreadyRead - buffer.fileStart) + " read size: " + lengthAfterStart + " full size: " + sample.size + ")");
                  DataStream.memcpy(
                    sample.data.buffer,
                    sample.alreadyRead,
                    buffer,
                    sample.offset + sample.alreadyRead - buffer.fileStart,
                    lengthAfterStart
                  );
                  sample.alreadyRead += lengthAfterStart;
                  buffer.usedBytes += lengthAfterStart;
                  this.stream.logBufferLevel();
                }
              } else {
                return null;
              }
            }
          };
          ISOFile.prototype.releaseSample = function(trak, sampleNum) {
            var sample = trak.samples[sampleNum];
            if (sample.data) {
              this.samplesDataSize -= sample.size;
              sample.data = null;
              sample.alreadyRead = 0;
              return sample.size;
            } else {
              return 0;
            }
          };
          ISOFile.prototype.getAllocatedSampleDataSize = function() {
            return this.samplesDataSize;
          };
          ISOFile.prototype.getCodecs = function() {
            var i2;
            var codecs = "";
            for (i2 = 0; i2 < this.moov.traks.length; i2++) {
              var trak = this.moov.traks[i2];
              if (i2 > 0) {
                codecs += ",";
              }
              codecs += trak.mdia.minf.stbl.stsd.entries[0].getCodec();
            }
            return codecs;
          };
          ISOFile.prototype.getTrexById = function(id) {
            var i2;
            if (!this.moov || !this.moov.mvex) return null;
            for (i2 = 0; i2 < this.moov.mvex.trexs.length; i2++) {
              var trex = this.moov.mvex.trexs[i2];
              if (trex.track_id == id) return trex;
            }
            return null;
          };
          ISOFile.prototype.getTrackById = function(id) {
            if (this.moov === undefined) {
              return null;
            }
            for (var j = 0; j < this.moov.traks.length; j++) {
              var trak = this.moov.traks[j];
              if (trak.tkhd.track_id == id) return trak;
            }
            return null;
          };
          ISOFile.prototype.itemsDataSize = 0;
          ISOFile.prototype.flattenItemInfo = function() {
            var items = this.items;
            var entity_groups = this.entity_groups;
            var i2, j;
            var item;
            var meta = this.meta;
            if (meta === null || meta === undefined) return;
            if (meta.hdlr === undefined) return;
            if (meta.iinf === undefined) return;
            for (i2 = 0; i2 < meta.iinf.item_infos.length; i2++) {
              item = {};
              item.id = meta.iinf.item_infos[i2].item_ID;
              items[item.id] = item;
              item.ref_to = [];
              item.name = meta.iinf.item_infos[i2].item_name;
              if (meta.iinf.item_infos[i2].protection_index > 0) {
                item.protection = meta.ipro.protections[meta.iinf.item_infos[i2].protection_index - 1];
              }
              if (meta.iinf.item_infos[i2].item_type) {
                item.type = meta.iinf.item_infos[i2].item_type;
              } else {
                item.type = "mime";
              }
              item.content_type = meta.iinf.item_infos[i2].content_type;
              item.content_encoding = meta.iinf.item_infos[i2].content_encoding;
            }
            if (meta.grpl) {
              for (i2 = 0; i2 < meta.grpl.boxes.length; i2++) {
                entity_group = {};
                entity_group.id = meta.grpl.boxes[i2].group_id;
                entity_group.entity_ids = meta.grpl.boxes[i2].entity_ids;
                entity_group.type = meta.grpl.boxes[i2].type;
                entity_groups[entity_group.id] = entity_group;
              }
            }
            if (meta.iloc) {
              for (i2 = 0; i2 < meta.iloc.items.length; i2++) {
                var itemloc = meta.iloc.items[i2];
                item = items[itemloc.item_ID];
                if (itemloc.data_reference_index !== 0) {
                  Log.warn("Item storage with reference to other files: not supported");
                  item.source = meta.dinf.boxes[itemloc.data_reference_index - 1];
                }
                switch (itemloc.construction_method) {
                  case 0:
                    break;
                  case 1:
                    break;
                  case 2:
                    Log.warn("Item storage with construction_method : not supported");
                    break;
                }
                item.extents = [];
                item.size = 0;
                for (j = 0; j < itemloc.extents.length; j++) {
                  item.extents[j] = {};
                  item.extents[j].offset = itemloc.extents[j].extent_offset + itemloc.base_offset;
                  if (itemloc.construction_method == 1) {
                    item.extents[j].offset += meta.idat.start + meta.idat.hdr_size;
                  }
                  item.extents[j].length = itemloc.extents[j].extent_length;
                  item.extents[j].alreadyRead = 0;
                  item.size += item.extents[j].length;
                }
              }
            }
            if (meta.pitm) {
              items[meta.pitm.item_id].primary = true;
            }
            if (meta.iref) {
              for (i2 = 0; i2 < meta.iref.references.length; i2++) {
                var ref2 = meta.iref.references[i2];
                for (j = 0; j < ref2.references.length; j++) {
                  items[ref2.from_item_ID].ref_to.push({ type: ref2.type, id: ref2.references[j] });
                }
              }
            }
            if (meta.iprp) {
              for (var k = 0; k < meta.iprp.ipmas.length; k++) {
                var ipma = meta.iprp.ipmas[k];
                for (i2 = 0; i2 < ipma.associations.length; i2++) {
                  var association = ipma.associations[i2];
                  item = items[association.id];
                  if (!item) {
                    item = entity_groups[association.id];
                  }
                  if (item) {
                    if (item.properties === undefined) {
                      item.properties = {};
                      item.properties.boxes = [];
                    }
                    for (j = 0; j < association.props.length; j++) {
                      var propEntry = association.props[j];
                      if (propEntry.property_index > 0 && propEntry.property_index - 1 < meta.iprp.ipco.boxes.length) {
                        var propbox = meta.iprp.ipco.boxes[propEntry.property_index - 1];
                        item.properties[propbox.type] = propbox;
                        item.properties.boxes.push(propbox);
                      }
                    }
                  }
                }
              }
            }
          };
          ISOFile.prototype.getItem = function(item_id) {
            var buffer;
            var item;
            if (!this.meta) {
              return null;
            }
            item = this.items[item_id];
            if (!item.data && item.size) {
              item.data = new Uint8Array(item.size);
              item.alreadyRead = 0;
              this.itemsDataSize += item.size;
              Log.debug("ISOFile", "Allocating item #" + item_id + " of size " + item.size + " (total: " + this.itemsDataSize + ")");
            } else if (item.alreadyRead === item.size) {
              return item;
            }
            for (var i2 = 0; i2 < item.extents.length; i2++) {
              var extent = item.extents[i2];
              if (extent.alreadyRead === extent.length) {
                continue;
              } else {
                var index = this.stream.findPosition(true, extent.offset + extent.alreadyRead, false);
                if (index > -1) {
                  buffer = this.stream.buffers[index];
                  var lengthAfterStart = buffer.byteLength - (extent.offset + extent.alreadyRead - buffer.fileStart);
                  if (extent.length - extent.alreadyRead <= lengthAfterStart) {
                    Log.debug("ISOFile", "Getting item #" + item_id + " extent #" + i2 + " data (alreadyRead: " + extent.alreadyRead + " offset: " + (extent.offset + extent.alreadyRead - buffer.fileStart) + " read size: " + (extent.length - extent.alreadyRead) + " full extent size: " + extent.length + " full item size: " + item.size + ")");
                    DataStream.memcpy(
                      item.data.buffer,
                      item.alreadyRead,
                      buffer,
                      extent.offset + extent.alreadyRead - buffer.fileStart,
                      extent.length - extent.alreadyRead
                    );
                    buffer.usedBytes += extent.length - extent.alreadyRead;
                    this.stream.logBufferLevel();
                    item.alreadyRead += extent.length - extent.alreadyRead;
                    extent.alreadyRead = extent.length;
                  } else {
                    Log.debug("ISOFile", "Getting item #" + item_id + " extent #" + i2 + " partial data (alreadyRead: " + extent.alreadyRead + " offset: " + (extent.offset + extent.alreadyRead - buffer.fileStart) + " read size: " + lengthAfterStart + " full extent size: " + extent.length + " full item size: " + item.size + ")");
                    DataStream.memcpy(
                      item.data.buffer,
                      item.alreadyRead,
                      buffer,
                      extent.offset + extent.alreadyRead - buffer.fileStart,
                      lengthAfterStart
                    );
                    extent.alreadyRead += lengthAfterStart;
                    item.alreadyRead += lengthAfterStart;
                    buffer.usedBytes += lengthAfterStart;
                    this.stream.logBufferLevel();
                    return null;
                  }
                } else {
                  return null;
                }
              }
            }
            if (item.alreadyRead === item.size) {
              return item;
            } else {
              return null;
            }
          };
          ISOFile.prototype.releaseItem = function(item_id) {
            var item = this.items[item_id];
            if (item.data) {
              this.itemsDataSize -= item.size;
              item.data = null;
              item.alreadyRead = 0;
              for (var i2 = 0; i2 < item.extents.length; i2++) {
                var extent = item.extents[i2];
                extent.alreadyRead = 0;
              }
              return item.size;
            } else {
              return 0;
            }
          };
          ISOFile.prototype.processItems = function(callback) {
            for (var i2 in this.items) {
              var item = this.items[i2];
              this.getItem(item.id);
              if (callback && !item.sent) {
                callback(item);
                item.sent = true;
                item.data = null;
              }
            }
          };
          ISOFile.prototype.hasItem = function(name) {
            for (var i2 in this.items) {
              var item = this.items[i2];
              if (item.name === name) {
                return item.id;
              }
            }
            return -1;
          };
          ISOFile.prototype.getMetaHandler = function() {
            if (!this.meta) {
              return null;
            } else {
              return this.meta.hdlr.handler;
            }
          };
          ISOFile.prototype.getPrimaryItem = function() {
            if (!this.meta || !this.meta.pitm) {
              return null;
            } else {
              return this.getItem(this.meta.pitm.item_id);
            }
          };
          ISOFile.prototype.itemToFragmentedTrackFile = function(_options) {
            var options = _options || {};
            var item = null;
            if (options.itemId) {
              item = this.getItem(options.itemId);
            } else {
              item = this.getPrimaryItem();
            }
            if (item == null) return null;
            var file = new ISOFile();
            file.discardMdatData = false;
            var trackOptions = { type: item.type, description_boxes: item.properties.boxes };
            if (item.properties.ispe) {
              trackOptions.width = item.properties.ispe.image_width;
              trackOptions.height = item.properties.ispe.image_height;
            }
            var trackId = file.addTrack(trackOptions);
            if (trackId) {
              file.addSample(trackId, item.data);
              return file;
            } else {
              return null;
            }
          };
          ISOFile.prototype.write = function(outstream) {
            for (var i2 = 0; i2 < this.boxes.length; i2++) {
              this.boxes[i2].write(outstream);
            }
          };
          ISOFile.prototype.createFragment = function(track_id, sampleNumber, stream_) {
            var trak = this.getTrackById(track_id);
            var sample = this.getSample(trak, sampleNumber);
            if (sample == null) {
              this.setNextSeekPositionFromSample(trak.samples[sampleNumber]);
              return null;
            }
            var stream = stream_ || new DataStream();
            stream.endianness = DataStream.BIG_ENDIAN;
            var moof = this.createSingleSampleMoof(sample);
            moof.write(stream);
            moof.trafs[0].truns[0].data_offset = moof.size + 8;
            Log.debug("MP4Box", "Adjusting data_offset with new value " + moof.trafs[0].truns[0].data_offset);
            stream.adjustUint32(moof.trafs[0].truns[0].data_offset_position, moof.trafs[0].truns[0].data_offset);
            var mdat = new BoxParser.mdatBox();
            mdat.data = sample.data;
            mdat.write(stream);
            return stream;
          };
          ISOFile.writeInitializationSegment = function(ftyp, moov, total_duration, sample_duration) {
            var i2;
            Log.debug("ISOFile", "Generating initialization segment");
            var stream = new DataStream();
            stream.endianness = DataStream.BIG_ENDIAN;
            ftyp.write(stream);
            var mvex = moov.add("mvex");
            if (total_duration) {
              mvex.add("mehd").set("fragment_duration", total_duration);
            }
            for (i2 = 0; i2 < moov.traks.length; i2++) {
              mvex.add("trex").set("track_id", moov.traks[i2].tkhd.track_id).set("default_sample_description_index", 1).set("default_sample_duration", sample_duration).set("default_sample_size", 0).set("default_sample_flags", 1 << 16);
            }
            moov.write(stream);
            return stream.buffer;
          };
          ISOFile.prototype.save = function(name) {
            var stream = new DataStream();
            stream.endianness = DataStream.BIG_ENDIAN;
            this.write(stream);
            stream.save(name);
          };
          ISOFile.prototype.getBuffer = function() {
            var stream = new DataStream();
            stream.endianness = DataStream.BIG_ENDIAN;
            this.write(stream);
            return stream.buffer;
          };
          ISOFile.prototype.initializeSegmentation = function() {
            var i2;
            var initSegs;
            var trak;
            var seg;
            if (this.onSegment === null) {
              Log.warn("MP4Box", "No segmentation callback set!");
            }
            if (!this.isFragmentationInitialized) {
              this.isFragmentationInitialized = true;
              this.nextMoofNumber = 0;
              this.resetTables();
            }
            initSegs = [];
            for (i2 = 0; i2 < this.fragmentedTracks.length; i2++) {
              var moov = new BoxParser.moovBox();
              moov.mvhd = this.moov.mvhd;
              moov.boxes.push(moov.mvhd);
              trak = this.getTrackById(this.fragmentedTracks[i2].id);
              moov.boxes.push(trak);
              moov.traks.push(trak);
              seg = {};
              seg.id = trak.tkhd.track_id;
              seg.user = this.fragmentedTracks[i2].user;
              seg.buffer = ISOFile.writeInitializationSegment(this.ftyp, moov, this.moov.mvex && this.moov.mvex.mehd ? this.moov.mvex.mehd.fragment_duration : undefined, this.moov.traks[i2].samples.length > 0 ? this.moov.traks[i2].samples[0].duration : 0);
              initSegs.push(seg);
            }
            return initSegs;
          };
          BoxParser.Box.prototype.printHeader = function(output) {
            this.size += 8;
            if (this.size > MAX_SIZE) {
              this.size += 8;
            }
            if (this.type === "uuid") {
              this.size += 16;
            }
            output.log(output.indent + "size:" + this.size);
            output.log(output.indent + "type:" + this.type);
          };
          BoxParser.FullBox.prototype.printHeader = function(output) {
            this.size += 4;
            BoxParser.Box.prototype.printHeader.call(this, output);
            output.log(output.indent + "version:" + this.version);
            output.log(output.indent + "flags:" + this.flags);
          };
          BoxParser.Box.prototype.print = function(output) {
            this.printHeader(output);
          };
          BoxParser.ContainerBox.prototype.print = function(output) {
            this.printHeader(output);
            for (var i2 = 0; i2 < this.boxes.length; i2++) {
              if (this.boxes[i2]) {
                var prev_indent = output.indent;
                output.indent += " ";
                this.boxes[i2].print(output);
                output.indent = prev_indent;
              }
            }
          };
          ISOFile.prototype.print = function(output) {
            output.indent = "";
            for (var i2 = 0; i2 < this.boxes.length; i2++) {
              if (this.boxes[i2]) {
                this.boxes[i2].print(output);
              }
            }
          };
          BoxParser.mvhdBox.prototype.print = function(output) {
            BoxParser.FullBox.prototype.printHeader.call(this, output);
            output.log(output.indent + "creation_time: " + this.creation_time);
            output.log(output.indent + "modification_time: " + this.modification_time);
            output.log(output.indent + "timescale: " + this.timescale);
            output.log(output.indent + "duration: " + this.duration);
            output.log(output.indent + "rate: " + this.rate);
            output.log(output.indent + "volume: " + (this.volume >> 8));
            output.log(output.indent + "matrix: " + this.matrix.join(", "));
            output.log(output.indent + "next_track_id: " + this.next_track_id);
          };
          BoxParser.tkhdBox.prototype.print = function(output) {
            BoxParser.FullBox.prototype.printHeader.call(this, output);
            output.log(output.indent + "creation_time: " + this.creation_time);
            output.log(output.indent + "modification_time: " + this.modification_time);
            output.log(output.indent + "track_id: " + this.track_id);
            output.log(output.indent + "duration: " + this.duration);
            output.log(output.indent + "volume: " + (this.volume >> 8));
            output.log(output.indent + "matrix: " + this.matrix.join(", "));
            output.log(output.indent + "layer: " + this.layer);
            output.log(output.indent + "alternate_group: " + this.alternate_group);
            output.log(output.indent + "width: " + this.width);
            output.log(output.indent + "height: " + this.height);
          };
          var MP4Box2 = {};
          MP4Box2.createFile = function(_keepMdatData, _stream) {
            var keepMdatData = _keepMdatData !== undefined ? _keepMdatData : true;
            var file = new ISOFile(_stream);
            file.discardMdatData = keepMdatData ? false : true;
            return file;
          };
          {
            exports.createFile = MP4Box2.createFile;
          }
        })(mp4box_all);
        return mp4box_all;
      }
      var mp4box_allExports = requireMp4box_all();
      const MP4Box = /* @__PURE__ */ getDefaultExportFromCjs(mp4box_allExports);
      class ClipperCore {
        constructor(options) {
          this.options = options;
        }
        // 辅助函数：获取解码器所需的额外数据
        // biome-ignore lint/suspicious/noExplicitAny: <unknow>
        getExtradata(mp4box) {
          try {
            const entry = mp4box.moov.traks[0].mdia.minf.stbl.stsd.entries[0];
            const box2 = entry.avcC ?? entry.hvcC ?? entry.vpcC;
            if (box2 != null) {
              const buffer = new ArrayBuffer(1024);
              const stream = new mp4box_allExports.DataStream(buffer, 0, mp4box_allExports.DataStream.BIG_ENDIAN);
              box2.write(stream);
              return new Uint8Array(stream.buffer, 8, stream.position - 8);
            }
          } catch (error) {
            console.error("Error in getExtradata:", error);
          }
          return null;
        }
        // 根据 URL 获取 ArrayBuffer，支持流式读取
        async fetchBuffer(url, signal, onData) {
          var _a;
          const response = await fetch(url, { signal, priority: "low" });
          if (!onData) {
            return await response.arrayBuffer();
          }
          const reader = (_a = response.body) == null ? undefined : _a.getReader();
          if (!reader) {
            throw new Error("Stream not supported");
          }
          const chunks = [];
          let totalLength = 0;
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (value) {
              chunks.push(value);
              totalLength += value.length;
              onData(value);
            }
          }
          const result = new Uint8Array(totalLength);
          let offset = 0;
          for (const chunk of chunks) {
            result.set(chunk, offset);
            offset += chunk.length;
          }
          return result.buffer;
        }
        // 根据 URL 获取指定范围的 ArrayBuffer
        async fetchBufferRange(url, start, end) {
          const response = await fetch(url, {
            headers: {
              Range: `bytes=${start}-${end}`
            },
            priority: "low"
          });
          return await response.arrayBuffer();
        }
        // 计算缩略图大小
        calcClipSize(width, height, maxWidth, maxHeight) {
          const scale = Math.min(maxWidth / width, maxHeight / height);
          return {
            width: width * scale,
            height: height * scale
          };
        }
        // 创建解码管道
        createDecodePipeline({
          nbSamples,
          maxWidth,
          maxHeight
        }) {
          let sampleCount = 0;
          const frames = [];
          const mp4boxfile = MP4Box.createFile();
          const transmuxer = new Mux.mp4.Transmuxer();
          let videoDecoder = null;
          let videoTrack = null;
          let currentPosition = 0;
          const promise = new Promise((resolve, reject) => {
            transmuxer.on(
              "data",
              (segment) => {
                try {
                  const initSegment = new Uint8Array(segment.initSegment);
                  const data = new Uint8Array(segment.data);
                  const buffer = new ArrayBuffer(
                    initSegment.byteLength + data.byteLength
                  );
                  const uint8View = new Uint8Array(buffer);
                  uint8View.set(initSegment, 0);
                  uint8View.set(data, initSegment.byteLength);
                  buffer.fileStart = currentPosition;
                  mp4boxfile.appendBuffer(buffer);
                  mp4boxfile.flush();
                } catch (error) {
                  reject(error);
                }
              }
            );
            transmuxer.on("error", (error) => {
              reject(error);
            });
            mp4boxfile.onReady = (info) => {
              videoTrack = info.videoTracks[0];
              if (videoTrack) {
                mp4boxfile.setExtractionOptions(videoTrack.id, "video", {
                  nbSamples
                });
                const { width, height } = this.calcClipSize(
                  videoTrack.track_width,
                  videoTrack.track_height,
                  maxWidth,
                  maxHeight
                );
                videoDecoder = new VideoDecoder({
                  output: async (videoFrame) => {
                    const img = await createImageBitmap(videoFrame, {
                      resizeQuality: "pixelated",
                      premultiplyAlpha: "none",
                      resizeWidth: width,
                      resizeHeight: height
                    });
                    const frame = {
                      img,
                      duration: videoFrame.duration,
                      timestamp: videoFrame.timestamp
                    };
                    sampleCount++;
                    frames.push(frame);
                    if (sampleCount >= nbSamples) {
                      resolve(frames);
                    }
                    videoFrame.close();
                  },
                  error: (error) => {
                    reject(error);
                  }
                });
                try {
                  videoDecoder.configure({
                    codec: videoTrack.codec,
                    codedWidth: videoTrack.track_width,
                    codedHeight: videoTrack.track_height,
                    hardwareAcceleration: "prefer-hardware",
                    optimizeForLatency: true,
                    description: this.getExtradata(mp4boxfile)
                  });
                } catch (error) {
                  reject(error);
                }
                mp4boxfile.start();
              }
            };
            mp4boxfile.onSamples = (trackId, _, samples) => {
              if ((videoTrack == null ? undefined : videoTrack.id) === trackId) {
                mp4boxfile.stop();
                for (let i2 = 0; i2 < samples.length && sampleCount < nbSamples; i2++) {
                  const sample = samples[i2];
                  const isKeyFrame = sample.is_sync;
                  const chunk = new EncodedVideoChunk({
                    type: isKeyFrame ? "key" : "delta",
                    timestamp: sample.cts * 1e7 / videoTrack.timescale,
                    duration: sample.duration * 1e7 / videoTrack.timescale,
                    data: sample.data
                  });
                  if (videoDecoder) {
                    videoDecoder.decode(chunk);
                  }
                }
              }
              if (videoDecoder) {
                videoDecoder.flush();
              }
            };
          });
          const push = (buffer, pos) => {
            transmuxer.push(buffer);
            currentPosition = pos;
          };
          const pipeline = {
            mp4boxfile,
            transmuxer,
            videoDecoder,
            videoTrack,
            promise,
            push,
            frames
          };
          return pipeline;
        }
        // 流式处理单个片段
        async processStreamingSegment({
          url,
          nbSamples,
          maxWidth,
          maxHeight
        }) {
          const MAX_STEP_COUNT = 5;
          const DEFAULT_STEP_CHUNK_SIZE = 1024 * 256;
          const DEFAULT_INITIAL_CHUNK_SIZE = DEFAULT_STEP_CHUNK_SIZE;
          const initialChunkSize = this.options.initialChunkSize || DEFAULT_INITIAL_CHUNK_SIZE;
          const stepChunkSize = this.options.stepChunkSize || DEFAULT_STEP_CHUNK_SIZE;
          let step = 0;
          let currentPosition = 0;
          const currentChunkSize = initialChunkSize;
          return new Promise((resolve, reject) => {
            const buffers = [];
            let bufferCumulativeSize = 0;
            const processNextChunk = async () => {
              try {
                const pipeline = this.createDecodePipeline({
                  nbSamples,
                  maxWidth,
                  maxHeight
                });
                const endPosition = currentPosition + currentChunkSize;
                const buffer = await this.fetchBufferRange(
                  url,
                  currentPosition,
                  endPosition - 1
                );
                buffers.push(new Uint8Array(buffer));
                bufferCumulativeSize += buffer.byteLength;
                const cumulativeBuffer = new Uint8Array(bufferCumulativeSize);
                let offset = 0;
                for (const buf of buffers) {
                  cumulativeBuffer.set(buf, offset);
                  offset += buf.byteLength;
                }
                pipeline.push(cumulativeBuffer, 0);
                pipeline.transmuxer.flush();
                if (pipeline.frames.length === 0) {
                  Promise.race([
                    pipeline.promise,
                    // 超时检测
                    new Promise((resolve2) => {
                      setTimeout(() => {
                        resolve2(new Error("timeout"));
                      }, 100);
                    })
                  ]).then(async (result) => {
                    if ((result instanceof Error || pipeline.frames.length === 0) && step < MAX_STEP_COUNT) {
                      currentPosition += stepChunkSize;
                      step++;
                      await processNextChunk();
                    } else {
                      resolve(pipeline.frames);
                    }
                  }).catch(async (error) => {
                    if (error.name === "EncodingError") {
                      currentPosition += stepChunkSize;
                      step++;
                      await processNextChunk();
                    } else {
                      reject(error);
                    }
                  });
                } else {
                  resolve(pipeline.frames);
                }
              } catch (error) {
                reject(error);
              }
            };
            processNextChunk();
          });
        }
      }
      class M3U8Clipper extends ClipperCore {
        constructor(options) {
          super(options);
          this.options = options;
          this.segmentCache = /* @__PURE__ */ new Map();
          this.M3U8Info = null;
          this.clipingPromise = /* @__PURE__ */ new Map();
          this.blur = 0;
          this.blurSegments = [];
        }
        async init(url, blur) {
          var _a;
          this.blur = blur;
          await this.fetchM3U8Info(url);
          this.blurSegments = this.getblurSegments(((_a = this.M3U8Info) == null ? undefined : _a.segments) ?? []);
        }
        // 模糊时间
        blurTime(time) {
          var _a;
          const _blurTime = time - time % this.blur + this.blur / 2;
          return Math.min(Math.max(0, _blurTime), ((_a = this.M3U8Info) == null ? undefined : _a.totalDuration) ?? 0);
        }
        // 模糊分段
        getblurSegments(segments) {
          return segments.filter((segment) => {
            const segmentBlurTime = this.blurTime(segment._startTime);
            const isInBlurRange = segment._startTime <= segmentBlurTime && segment._endTime >= segmentBlurTime;
            return isInBlurRange;
          });
        }
        // 获取 M3U8 信息
        async fetchM3U8Info(url) {
          const response = await fetch(url);
          const m3u8Text = await response.text();
          const parser = new Parser();
          parser.push(m3u8Text);
          parser.end();
          const manifest = parser.manifest;
          let startTime = 0;
          manifest.segments = manifest.segments.map((segment, index) => {
            const uri = new URL(segment.uri, url).href;
            const endTime = startTime + segment.duration;
            const info = {
              ...segment,
              _uri: uri,
              _duration: segment.duration,
              _startTime: startTime,
              _endTime: endTime,
              _index: index
            };
            startTime = endTime;
            return info;
          });
          manifest.totalDuration = startTime;
          this.M3U8Info = manifest;
          return manifest;
        }
        // 获取缩略图
        async getClip(time) {
          var _a;
          if (!this.M3U8Info) {
            throw new Error("M3U8Info is not initialized");
          }
          const segment = this.findSegmentByTime(time);
          if (!segment) {
            throw new Error(
              `Segment is not found: ${time}，totalDuration: ${(_a = this.M3U8Info) == null ? undefined : _a.totalDuration}`
            );
          }
          const clipingPromise = this.clipingPromise.get(segment._index);
          if (clipingPromise) {
            throw new Error(
              `Segment is already being clipped: ${segment._index}
				`
            );
          }
          const promise = this.clipsSegment(segment);
          this.clipingPromise.set(segment._index, promise);
          const segmentClips = await promise;
          if (!segmentClips) {
            return null;
          }
          this.segmentCache.set(segment._index, segmentClips);
          return this.findFrameByTime(segmentClips, time);
        }
        // 获取缓存缩略图
        getClipByCache(time) {
          var _a;
          if (!this.M3U8Info) {
            throw new Error("M3U8Info is not initialized");
          }
          const segment = this.findSegmentByTime(time);
          if (!segment) {
            throw new Error(
              `Segment is not found: ${time}，totalDuration: ${(_a = this.M3U8Info) == null ? undefined : _a.totalDuration}`
            );
          }
          const clips = this.segmentCache.get(segment._index);
          if (!clips) {
            return null;
          }
          return this.findFrameByTime(clips, time);
        }
        // 根据时间获取分段
        findSegmentByTime(time) {
          if (!this.M3U8Info) {
            throw new Error("M3U8Info is not initialized");
          }
          for (const segment of this.M3U8Info.segments) {
            if (time >= segment._startTime && time < segment._endTime) {
              return segment;
            }
          }
          return null;
        }
        // 清除缓存
        clear() {
          this.M3U8Info = null;
          this.segmentCache.clear();
          this.clipingPromise.clear();
        }
        // 根据 URL 生成分段截图
        async clipsSegment(segment) {
          const startTime = performance.now();
          try {
            const processedFrames = await this.processStreamingSegment({
              url: segment._uri,
              nbSamples: 1,
              maxWidth: this.options.maxWidth,
              maxHeight: this.options.maxHeight
            });
            if (!processedFrames.length) {
              console.warn("No video frames extracted");
              return null;
            }
            const endTime = performance.now();
            const totalTime = endTime - startTime;
            const segmentClips = {
              frames: processedFrames,
              count: processedFrames.length,
              segment,
              times: {
                total: totalTime
              }
            };
            return segmentClips;
          } catch (error) {
            console.error("Error processing segment:", error);
            return null;
          }
        }
        // 根据 time 获取帧
        findFrameByTime(segmentClips, time) {
          return segmentClips.frames.find(
            (frame) => segmentClips.segment._startTime + frame.timestamp >= time
          ) ?? segmentClips.frames[0] ?? null;
        }
      } exports("M", M3U8Clipper);
      const qualityNumMap = exports("q", {
        360: "360P",
        480: "480P",
        720: "720P",
        1080: "1080P",
        2160: "4K",
        9999: "原画"
      });
      const qualityCodeMap = {
        "3G": 360,
        SD: 480,
        HD: 720,
        UD: 1080,
        BD: 2160,
        YH: 9999
      };
      const USER_AGENT_115 = navigator.userAgent;
      class Rsa115 {
        constructor() {
          this.n = bigInt(
            "8686980c0f5a24c4b9d43020cd2c22703ff3f450756529058b1cf88f09b8602136477198a6e2683149659bd122c33592fdb5ad47944ad1ea4d36c6b172aad6338c3bb6ac6227502d010993ac967d1aef00f0c8e038de2e4d3bc2ec368af2e9f10a6f1eda4f7262f136420c07c331b871bf139f74f3010e3c4fe57df3afb71683",
            16
          );
          this.e = bigInt("10001", 16);
        }
        a2hex(byteArray) {
          let hexString = "";
          let nextHexByte;
          for (let i2 = 0; i2 < byteArray.length; i2++) {
            nextHexByte = byteArray[i2].toString(16);
            if (nextHexByte.length < 2) {
              nextHexByte = `0${nextHexByte}`;
            }
            hexString += nextHexByte;
          }
          return hexString;
        }
        hex2a(hex) {
          let str = "";
          for (let i2 = 0; i2 < hex.length; i2 += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i2, 2), 16));
          }
          return str;
        }
        pkcs1pad2(s, n) {
          if (n < s.length + 11) {
            return null;
          }
          const ba = [];
          let pos = n;
          let i2 = s.length - 1;
          while (i2 >= 0 && pos > 0) {
            ba[--pos] = s.charCodeAt(i2--);
          }
          ba[--pos] = 0;
          while (pos > 2) {
            ba[--pos] = 255;
          }
          ba[--pos] = 2;
          ba[--pos] = 0;
          const c = this.a2hex(ba);
          return bigInt(c, 16);
        }
        pkcs1unpad2(a) {
          let b = a.toString(16);
          if (b.length % 2 !== 0) {
            b = `0${b}`;
          }
          const c = this.hex2a(b);
          let i2 = 1;
          while (c.charCodeAt(i2) !== 0) {
            i2++;
          }
          return c.slice(i2 + 1);
        }
        encrypt(text) {
          const m = this.pkcs1pad2(text, 128);
          if (!m) {
            throw new Error("pkcs1pad2 failed");
          }
          const c = m.modPow(this.e, this.n);
          let h2 = c.toString(16);
          while (h2.length < 128 * 2) {
            h2 = `0${h2}`;
          }
          return h2;
        }
        decrypt(text) {
          const ba = [];
          let i2 = 0;
          while (i2 < text.length) {
            ba[i2] = text.charCodeAt(i2);
            i2 += 1;
          }
          const a = bigInt(this.a2hex(ba), 16);
          const c = a.modPow(this.e, this.n);
          const d = this.pkcs1unpad2(c);
          return d;
        }
      }
      class Crypto115 {
        constructor() {
          this.rsa = new Rsa115();
          this.kts = [
            240,
            229,
            105,
            174,
            191,
            220,
            191,
            138,
            26,
            69,
            232,
            190,
            125,
            166,
            115,
            184,
            222,
            143,
            231,
            196,
            69,
            218,
            134,
            196,
            155,
            100,
            139,
            20,
            106,
            180,
            241,
            170,
            56,
            1,
            53,
            158,
            38,
            105,
            44,
            134,
            0,
            107,
            79,
            165,
            54,
            52,
            98,
            166,
            42,
            150,
            104,
            24,
            242,
            74,
            253,
            189,
            107,
            151,
            143,
            77,
            143,
            137,
            19,
            183,
            108,
            142,
            147,
            237,
            14,
            13,
            72,
            62,
            215,
            47,
            136,
            216,
            254,
            254,
            126,
            134,
            80,
            149,
            79,
            209,
            235,
            131,
            38,
            52,
            219,
            102,
            123,
            156,
            126,
            157,
            122,
            129,
            50,
            234,
            182,
            51,
            222,
            58,
            169,
            89,
            52,
            102,
            59,
            170,
            186,
            129,
            96,
            72,
            185,
            213,
            129,
            156,
            248,
            108,
            132,
            119,
            255,
            84,
            120,
            38,
            95,
            190,
            232,
            30,
            54,
            159,
            52,
            128,
            92,
            69,
            44,
            155,
            118,
            213,
            27,
            143,
            204,
            195,
            184,
            245
          ];
          this.keyS = [41, 35, 33, 94];
          this.keyL = [120, 6, 173, 76, 51, 134, 93, 24, 76, 1, 63, 70];
        }
        xor115Enc(src, srclen, key, keylen) {
          const mod4 = srclen % 4;
          const ret2 = [];
          for (let i2 = 0; i2 < mod4; i2++) {
            ret2.push(src[i2] ^ key[i2 % keylen]);
          }
          for (let i2 = mod4; i2 < srclen; i2++) {
            ret2.push(src[i2] ^ key[(i2 - mod4) % keylen]);
          }
          return ret2;
        }
        getkey(length, key) {
          if (key) {
            const results = [];
            for (let i2 = 0; i2 < length; i2++) {
              const v1 = key[i2] + this.kts[length * i2] & 255;
              const v2 = this.kts[length * (length - 1 - i2)];
              results.push(v1 ^ v2);
            }
            return results;
          }
          return length === 12 ? this.keyL.slice(0) : this.keyS.slice(0);
        }
        asymEncode(src, srclen) {
          const m = 128 - 11;
          let ret2 = "";
          for (let i2 = 0; i2 < Math.floor((srclen + m - 1) / m); i2++) {
            ret2 += this.rsa.encrypt(
              this.bytesToString(src.slice(i2 * m, Math.min((i2 + 1) * m, srclen)))
            );
          }
          return btoa(this.rsa.hex2a(ret2));
        }
        asymDecode(src, srclen) {
          const m = 128;
          let ret2 = "";
          for (let i2 = 0; i2 < Math.floor((srclen + m - 1) / m); i2++) {
            ret2 += this.rsa.decrypt(
              this.bytesToString(src.slice(i2 * m, Math.min((i2 + 1) * m, srclen)))
            );
          }
          return this.stringToBytes(ret2);
        }
        symEncode(src, srclen, key1, key2) {
          const k1 = this.getkey(4, key1);
          const k2 = this.getkey(12, key2);
          let ret2 = this.xor115Enc(src, srclen, k1, 4);
          ret2.reverse();
          ret2 = this.xor115Enc(ret2, srclen, k2, 12);
          return ret2;
        }
        symDecode(src, srclen, key1, key2) {
          const k1 = this.getkey(4, key1);
          const k2 = this.getkey(12, key2);
          let ret2 = this.xor115Enc(src, srclen, k2, 12);
          ret2.reverse();
          ret2 = this.xor115Enc(ret2, srclen, k1, 4);
          return ret2;
        }
        bytesToString(buf) {
          return buf.map((b) => String.fromCharCode(b)).join("");
        }
        stringToBytes(str) {
          return Array.from(str).map((c) => c.charCodeAt(0));
        }
        m115_encode(str, timestamp) {
          const key = this.stringToBytes(md5(`!@###@#${timestamp}DFDR@#@#`));
          let temp = this.stringToBytes(str);
          temp = this.symEncode(temp, temp.length, key);
          temp = key.slice(0, 16).concat(temp);
          return {
            data: this.asymEncode(temp, temp.length),
            key
          };
        }
        m115_decode(str, key) {
          let temp = this.stringToBytes(atob(str));
          temp = this.asymDecode(temp, temp.length);
          return this.bytesToString(
            this.symDecode(temp.slice(16), temp.length - 16, key, temp.slice(0, 16))
          );
        }
      }
      class Drive115Core {
        constructor(iRequest) {
          this.iRequest = iRequest;
          this.logger = new AppLogger("Drive115Core");
          this.BASE_URL = NORMAL_URL_115;
          this.WEB_API_URL = WEB_API_URL_115;
          this.PRO_API_URL = PRO_API_URL_115;
          this.VOD_URL_115 = VOD_URL_115;
          this.verifying = false;
          this.crypto115 = new Crypto115();
        }
        verifyVod(pickcode) {
          if (this.verifying) {
            return;
          }
          this.verifying = true;
          alert("你已经高频操作了!\n先去通过一下人机验证再回来刷新页面哦~");
          _GM_openInTab(new URL(`?pickcode=${pickcode}`, this.VOD_URL_115).href, {
            active: true
          });
        }
        async fakeVodAuthPickcode(pickcode) {
          await this.iRequest.get(
            new URL(`?pickcode=${pickcode}`, this.VOD_URL_115).href,
            {
              headers: {
                "User-Agent": USER_AGENT_115
              },
              responseType: "document",
              redirect: "follow"
            }
          );
        }
        // 获取原文件地址
        async getDownloadUrlByNormal(pickcode) {
          const response = await this.iRequest.get(
            new URL(`/files/download?pickcode=${pickcode}`, this.WEB_API_URL).href,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          );
          const res = await response.json();
          if (res.errNo === 990001) {
            alert("登录已过期，请重新登录");
          }
          if (!res.state || !res.file_url) {
            throw new Error(`服务器返回数据格式错误: ${JSON.stringify(res)}`);
          }
          return {
            url: {
              url: res.file_url
            }
          };
        }
        // 获取原文件地址
        async getDownloadUrlByPro(pickcode) {
          const tm = Math.floor(Date.now() / 1e3).toString();
          const src = JSON.stringify({ pickcode });
          const encoded = this.crypto115.m115_encode(src, tm);
          const data = `data=${encodeURIComponent(encoded.data)}`;
          this.logger.log("发送加密数据:", data);
          const response = await this.iRequest.post(
            new URL(`/app/chrome/downurl?t=${tm}`, this.PRO_API_URL).href,
            {
              body: data,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": USER_AGENT_115
              }
            }
          );
          const res = await response.json();
          this.logger.log("Pro方式响应:", res);
          if (!res.state) {
            throw new Error(`获取下载地址失败: ${JSON.stringify(res)}`);
          }
          const result = JSON.parse(
            this.crypto115.m115_decode(res.data, encoded.key)
          );
          const downloadInfo = Object.values(result)[0];
          return downloadInfo;
        }
        // 获取原文件地址
        async getFileDownloadUrl(pickcode) {
          try {
            return await this.getDownloadUrlByPro(pickcode);
          } catch (error) {
            console.warn("第一种获取下载链接失败", error);
            this.logger.log("开始使用第二种方式获取下载链接", error);
            const res = await this.getDownloadUrlByNormal(pickcode);
            return res;
          }
        }
        // 获取原文件地址
        async getOriginFileUrl(pickcode, fileId) {
          const response = await this.iRequest.get(
            new URL(
              `/app/chrome/down?method=get_file_url&pickcode=${pickcode}`,
              this.PRO_API_URL
            ).href,
            {
              headers: {
                "Content-Type": "application/json",
                "User-Agent": USER_AGENT_115
              }
            }
          );
          const res = await response.json();
          if (res.state) {
            return res.data[fileId];
          }
          throw new Error(`获取原文件地址失败: ${JSON.stringify(res)}`);
        }
        // 获取 m3u8 根 url
        getM3u8RootUrl(pickcode) {
          return new URL(`/api/video/m3u8/${pickcode}.m3u8`, this.BASE_URL).href;
        }
        // 解析 m3u8 列表
        async parseM3u8Url(url, pickcode) {
          const response = await this.iRequest.get(url, {
            headers: {
              "Content-Type": "application/json",
              "User-Agent": USER_AGENT_115
            }
          });
          const htmlText = await response.text();
          if (!/^#/.test(htmlText)) {
            const res = JSON.parse(htmlText);
            if (res.state === false) {
              if (res.code === 911) {
                this.verifyVod(pickcode);
              }
              throw new Error(`获取m3u8文件失败: ${res.error}`);
            }
          }
          const lines = htmlText.split("\n");
          const m3u8List = [];
          htmlText.split("\n").forEach((line, index) => {
            var _a, _b;
            if (line.includes('NAME="')) {
              const extXStreamInf = line.match(/#EXT-X-STREAM-INF/);
              if (extXStreamInf) {
                const name = ((_a = line.match(/NAME="([^"]*)"/)) == null ? undefined : _a[1]) ?? "";
                const url2 = (_b = lines[index + 1]) == null ? undefined : _b.trim();
                m3u8List.push({
                  name,
                  quality: qualityCodeMap[name],
                  url: url2
                });
              }
            }
          });
          m3u8List.sort((a, b) => b.quality - a.quality);
          this.logger.log("m3u8List result", m3u8List);
          return m3u8List;
        }
        // 获取 m3u8 列表
        async getM3u8(pickcode) {
          const url = this.getM3u8RootUrl(pickcode);
          const m3u8List = await this.parseM3u8Url(url, pickcode);
          return m3u8List;
        }
        // 获取播放列表
        async apsNatsortFiles(params) {
          const response = await this.iRequest.get(
            new URL("/aps/natsort/files.php", this.VOD_URL_115).href,
            {
              params,
              headers: {
                "Content-Type": "application/json",
                "User-Agent": USER_AGENT_115,
                host: VOD_HOST_155,
                referer: `${this.VOD_URL_115}/?pickcode=${params.pickcode}&share_id=0`
              }
            }
          );
          return await response.json();
        }
        // 获取播放列表
        async webapiFiles(params) {
          const response = await this.iRequest.get(
            new URL("/webapi/files", this.VOD_URL_115).href,
            {
              params,
              headers: {
                "Content-Type": "application/json",
                "User-Agent": USER_AGENT_115,
                referer: `${this.VOD_URL_115}/?pickcode=${params.pickcode}&share_id=0`,
                host: VOD_HOST_155
              }
            }
          );
          return await response.json();
        }
        // 获取播放列表
        async getPlaylist(cid, pickcode, offset = 0) {
          const obj = {
            pickcode,
            aid: 1,
            cid,
            offset,
            limit: 115,
            show_dir: 0,
            nf: "",
            qid: 0,
            type: 4,
            source: "",
            format: "json",
            star: "",
            is_q: "",
            is_share: "",
            r_all: 1,
            o: "file_name",
            asc: 1,
            cur: 1,
            natsort: 1
          };
          try {
            const response = await this.webapiFiles(obj);
            if (response.state) {
              return response.data;
            }
            throw new Error("webapiFiles 获取播放列表失败");
          } catch (error) {
            this.logger.log("获取webapiFiles失败，尝试使用apsNatsortFiles获取");
            const response = await this.apsNatsortFiles(obj);
            if (response.state) {
              return response.data;
            }
            throw new Error(`获取播放列表失败: ${JSON.stringify(response)}`);
          }
        }
        // 获取文件信息
        async getFileInfo(params) {
          const response = await this.iRequest.get(
            new URL("/webapi/files/video", this.VOD_URL_115).href,
            {
              params,
              headers: {
                "Content-Type": "application/json",
                "User-Agent": USER_AGENT_115,
                referer: `${this.VOD_URL_115}/?pickcode=${params.pickcode}&share_id=0`,
                host: VOD_HOST_155
              }
            }
          );
          return await response.json();
        }
        // 获取播放历史
        async VodApiGetWebApiFilesHistory(params) {
          const response = await this.iRequest.get(
            new URL("/webapi/files/history", this.VOD_URL_115).href,
            {
              params,
              headers: {
                referer: `${this.VOD_URL_115}/?pickcode=${params.pick_code}&share_id=0`,
                host: VOD_HOST_155
              }
            }
          );
          return await response.json();
        }
        // 更新播放历史
        async VodApiPostWebApiFilesHistory(data) {
          const response = await this.iRequest.post(
            new URL("/webapi/files/history", this.VOD_URL_115).href,
            {
              data,
              headers: {
                referer: `${this.VOD_URL_115}/?pickcode=${data.pick_code}&share_id=0`,
                host: VOD_HOST_155
              }
            }
          );
          return await response.json();
        }
      }
      class Drive115GM extends Drive115Core {
        constructor() {
          super(new GMRequest());
        }
      }
      const Drive115Instance = exports("D", new Drive115GM());
      const _hoisted_1$1 = ["id"];
      const _hoisted_2$1 = ["onClick"];
      const _hoisted_3$1 = ["src", "alt"];
      const _sfc_main$1 = /* @__PURE__ */ defineComponent({
        __name: "index",
        props: {
          pickCode: {},
          sha1: {}
        },
        setup(__props) {
          const props = __props;
          const rootRef = ref();
          const rootVisibilityRef = useElementVisibility(rootRef, {
            threshold: 0.3
          });
          const videoRef = ref();
          const lightbox = ref(null);
          const initPhotoSwipe = () => {
            var _a;
            if (lightbox.value) {
              lightbox.value.destroy();
              lightbox.value = null;
            }
            lightbox.value = new PhotoSwipeLightbox({
              dataSource: ((_a = videoData.state.value) == null ? undefined : _a.map((item) => ({
                src: item.img,
                width: item.width,
                height: item.height,
                alt: "预览图"
              }))) || [],
              showHideAnimationType: "fade",
              pswpModule: () => __vitePreload(() => module.import('photoswipe'), void 0 ),
              mouseMovePan: true,
              initialZoomLevel: "fit",
              secondaryZoomLevel: 2,
              maxZoomLevel: 4,
              wheelToZoom: true,
              bgOpacity: 0.9
            });
            lightbox.value.init();
          };
          const openPhotoSwipe = (index) => {
            var _a;
            if (!lightbox.value || !((_a = videoData.state.value) == null ? undefined : _a.length)) return;
            lightbox.value.loadAndOpen(index);
          };
          const fetchVideoData = async () => {
            const cache = await previewCache.get(props.sha1);
            if (cache) {
              const cachedData = cache.value;
              const processedData = await Promise.all(
                cachedData.map(async (item) => {
                  const base64 = await blobToBase64(item);
                  const { width, height } = await getImageSize(base64);
                  return {
                    img: base64,
                    width,
                    height
                  };
                })
              );
              return processedData;
            }
            const m3u8List = await Drive115Instance.getM3u8(props.pickCode);
            const source = m3u8List.sort((a, b) => a.quality - b.quality)[0];
            if (!source) return null;
            const clipper = new M3U8Clipper({
              maxWidth: 720,
              maxHeight: 720
            });
            await clipper.init(source.url, 0);
            const segments = sampleSize(clipper.M3U8Info.segments, 5);
            const frames = await Promise.all(
              segments.map((segment) => clipper.getClip(segment._startTime))
            );
            const thumbnails = await Promise.all(
              frames.filter(Boolean).map(async (frame) => {
                const width = frame.img.width;
                const height = frame.img.height;
                const isBlack = await isBlackFrame(frame.img);
                if (isBlack) return null;
                const blob = await imageBitmapToBlob(frame.img, 0.8);
                const base64 = await blobToBase64(blob);
                return {
                  // 用于显示
                  img: base64,
                  // 用于缓存
                  cacheBlob: blob,
                  width,
                  height
                };
              })
            );
            clipper.clear();
            const filteredThumbnails = thumbnails.filter(Boolean);
            try {
              const cacheData = filteredThumbnails.map((item) => item.cacheBlob);
              await previewCache.set(props.sha1, cacheData);
            } catch (error) {
              console.error("缓存失败:", error);
            }
            return filteredThumbnails.map((item) => ({
              img: item.img,
              width: item.width,
              height: item.height
            }));
          };
          const videoData = useAsyncState(fetchVideoData, null, { immediate: false });
          watch(
            () => rootVisibilityRef.value,
            (visible) => {
              if (visible) {
                videoData.execute(0);
              }
            }
          );
          watch(
            () => videoData.state.value,
            async (newValue) => {
              if ((newValue == null ? undefined : newValue.length) > 0) {
                await nextTick();
                initPhotoSwipe();
              }
            }
          );
          onBeforeUnmount(() => {
            if (lightbox.value) {
              lightbox.value.destroy();
              lightbox.value = null;
            }
          });
          return (_ctx, _cache) => {
            return openBlock(), createElementBlock("div", {
              class: "ext-preview",
              ref_key: "rootRef",
              ref: rootRef
            }, [
              unref(videoData).error.value ? (openBlock(), createBlock(LoadingError, {
                key: 0,
                style: { "margin": "0 auto" }
              })) : unref(videoData).isLoading.value ? (openBlock(), createBlock(Skeleton, {
                key: 1,
                mode: "light",
                width: "100%",
                height: "100%",
                "border-radius": "0"
              })) : (openBlock(), createElementBlock("div", {
                key: 2,
                class: "ext-preview-video pswp-gallery",
                id: `gallery-${props.pickCode}`,
                ref_key: "videoRef",
                ref: videoRef
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(videoData).state.value, (thumbnail, index) => {
                  return openBlock(), createElementBlock("a", {
                    key: index,
                    class: "thumb-item",
                    onClick: withModifiers(($event) => openPhotoSwipe(index), ["prevent", "stop"])
                  }, [
                    createElementVNode("img", {
                      src: thumbnail.img,
                      alt: `预览图 ${index + 1}`
                    }, null, 8, _hoisted_3$1)
                  ], 8, _hoisted_2$1);
                }), 128))
              ], 8, _hoisted_1$1))
            ], 512);
          };
        }
      });
      const ExtPreview = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-36dee46a"]]);
      class FileItem {
        constructor($item, actressFaceDB2) {
          this.$item = $item;
          this.actressFaceDB = actressFaceDB2;
          this.vueApp = null;
          this.initedActressInfo = false;
          this.$fileNameDom = null;
          this.$fileNameWrapDom = null;
          this.$fileNameATagDom = null;
          this.getDoms();
        }
        get attributes() {
          return Object.fromEntries(
            Array.from(this.$item.attributes).map((attr) => [attr.name, attr.value])
          );
        }
        get avNumber() {
          return getAvNumber(this.attributes.title);
        }
        getDoms() {
          this.$fileNameDom = this.$item.querySelector(".file-name");
          this.$fileNameWrapDom = this.$item.querySelector(
            ".file-name-wrap"
          );
          this.$fileNameATagDom = this.$fileNameDom.querySelector(
            "a"
          );
        }
        // 加载扩展信息
        async loadExtInfo() {
          if (this.attributes.iv !== "1" && this.attributes.file_type !== "0") {
            return;
          }
          if (this.$item.classList.contains("with-ext-info")) {
            return;
          }
          if (this.avNumber) {
            this.$item.classList.add("with-ext-info");
            const extInfoDom = document.createElement("div");
            this.$item.append(extInfoDom);
            extInfoDom.className = "ext-info-root";
            const app = createApp(ExtInfo, {
              avNumber: this.avNumber
            });
            app.mount(extInfoDom);
            this.vueApp = app;
          }
        }
        // 加载演员信息
        async loadActressInfo() {
          var _a;
          if (this.initedActressInfo === true) {
            return;
          }
          this.initedActressInfo = true;
          const actress = await actressFaceDB.findActress(
            this.attributes.title.trim()
          );
          if (this.$item.classList.contains("with-actress-info")) {
            return;
          }
          if (actress) {
            this.$item.classList.add("with-actress-info");
            const actressDom = document.createElement("img");
            actressDom.alt = actress.filename;
            actressDom.loading = "lazy";
            actressDom.className = "actress-info-img";
            (_a = this.$item.querySelector(".file-name-wrap")) == null ? undefined : _a.prepend(actressDom);
            try {
              const cacheKey = `actress-face-${actress.url}`;
              const cachedImage = await imageCache.get(cacheKey);
              if (cachedImage) {
                actressDom.src = URL.createObjectURL(cachedImage.value);
              } else {
                actressDom.src = actress.url;
                try {
                  const response = await fetch(actress.url);
                  if (response.ok) {
                    const blob = await response.blob();
                    const compressedBlob = await compressImage(blob, {
                      maxWidth: 200,
                      maxHeight: 200,
                      quality: 0.8,
                      type: "image/webp"
                    });
                    await imageCache.set(cacheKey, compressedBlob);
                  }
                } catch (error) {
                  console.error("缓存演员头像失败:", error);
                }
              }
            } catch (error) {
              console.error("加载演员头像缓存失败:", error);
              actressDom.src = actress.url;
            }
          }
        }
        // 加载预览视频
        async loadPreview() {
          if (this.avNumber) {
            return;
          }
          if (this.attributes.file_type === "0") {
            return;
          }
          if (this.attributes.iv !== "1") {
            return;
          }
          if (this.attributes.vdi === "0") {
            return;
          }
          if (this.$item.classList.contains("with-ext-preview")) {
            return;
          }
          this.$item.classList.add("with-ext-preview");
          const previewDom = document.createElement("div");
          previewDom.className = "ext-preview-root";
          this.$item.append(previewDom);
          const app = createApp(ExtPreview, {
            pickCode: this.attributes.pick_code,
            sha1: this.attributes.sha1
          });
          app.mount(previewDom);
          this.vueApp = app;
        }
        async load() {
          this.loadExtInfo();
          this.loadActressInfo();
          this.loadPreview();
        }
        destroy() {
          var _a;
          (_a = this.vueApp) == null ? undefined : _a.unmount();
        }
      }
      class FileListMod {
        constructor() {
          this.items = [];
          this.offChangePage = null;
          this.actressFaceDB = null;
          this.logger = new AppLogger("FileStyle");
          this.init();
        }
        getOriginDom() {
          var _a;
          this.$list = document.querySelector(".list-contents") ?? null;
          this.$items = ((_a = this.$list) == null ? undefined : _a.querySelectorAll("li")) ?? null;
        }
        async init() {
          this.logger.log("init");
          this.actressFaceDB = new ActressFaceDB();
          this.actressFaceDB.init();
          this.getOriginDom();
          if (this.$list && this.$items) {
            this.loadExtInfo();
          } else {
            await this.waitListLoaded();
            this.loadExtInfo();
          }
          this.loadExtInfo();
          this.offChangePage = this.onChangePage(async () => {
            this.destroyItems();
            await this.waitListLoaded();
            this.loadExtInfo();
          });
        }
        waitListLoaded() {
          return new Promise((resolve) => {
            let observerContent = null;
            observerContent = new MutationObserver(() => {
              observerContent == null ? undefined : observerContent.disconnect();
              resolve();
            });
            observerContent.observe(document, {
              subtree: true,
              childList: true,
              characterData: true
            });
          });
        }
        loadExtInfo() {
          this.getOriginDom();
          if (this.$list && this.$items) {
            this.$items.forEach((item) => {
              const fileItem = new FileItem(item, this.actressFaceDB);
              fileItem.load();
              this.items.push(fileItem);
            });
          }
        }
        onChangePage(callback) {
          let lastUrl = window.parent.location.href;
          const observerUrl = new MutationObserver(() => {
            const url = window.parent.location.href;
            if (url !== lastUrl) {
              lastUrl = url;
              callback(lastUrl, url);
            }
          });
          observerUrl.observe(document, {
            subtree: true,
            childList: true,
            characterData: true
          });
          return () => {
            observerUrl.disconnect();
          };
        }
        destroyItems() {
          if (this.items.length === 0) {
            return;
          }
          this.items.forEach((item) => {
            item.destroy();
          });
          this.items = [];
        }
        destroy() {
          var _a;
          this.logger.log("destroy");
          this.destroyItems();
          (_a = this.offChangePage) == null ? undefined : _a.call(this);
        }
      }
      const isMac = exports("i", _GM_info.userAgentData.platform.match(/mac/i));
      const GM_VALUE_KEY = {
        PLAYING_VIDEO_INFO: "playingVideoInfo"
      };
      const goToPlayer = exports("g", (playingVideoInfo, isOpenInTab = false) => {
        _GM_setValue(GM_VALUE_KEY.PLAYING_VIDEO_INFO, playingVideoInfo);
        const params = new URLSearchParams({
          cid: playingVideoInfo.cid || "",
          pick_code: playingVideoInfo.pickCode,
          avNumber: playingVideoInfo.avNumber || "",
          title: playingVideoInfo.title
        });
        const url = `https://${NORMAL_HOST_155}/web/lixian/master/video/?${params.toString()}`;
        if (isOpenInTab) {
          _GM_openInTab(url, {
            active: true
          });
          return;
        }
        history.pushState({}, "", url);
      });
      const webLinkShortcutsMpv = exports("f", (downloadResult) => {
        const shell = {
          bin: "/opt/homebrew/bin/mpv",
          url: downloadResult.url.url,
          userAgent: navigator.userAgent
        };
        return `shortcuts://run-shortcut?name=115MasterWebLink&input=text&text=${encodeURIComponent(
    JSON.stringify(shell)
  )}`;
      });
      const webLinkIINA = exports("w", (downloadResult) => {
        var _a, _b;
        return `iina://weblink?url=${encodeURIComponent(downloadResult.url.url)}&mpv_http-header-fields=${encodeURIComponent(
    `User-Agent: ${navigator.userAgent.replace(",", "\\,")},Cookie: ${(_a = downloadResult.url.auth_cookie) == null ? undefined : _a.name}=${(_b = downloadResult.url.auth_cookie) == null ? undefined : _b.value}`
  )}`;
      });
      class FileOperationMenu {
        constructor() {
          this.ContentsMenubuttons = [
            {
              class: "115-player",
              title: "使用【115官方播放器】",
              text: "5️⃣ 官方播放"
            },
            ...isMac ? [
              {
                class: "iina-player",
                title: "使用【iina】",
                text: "🎵 iina 播放"
              }
            ] : [],
            {
              class: "master-player",
              title: "使用【Master播放器】",
              text: "▶️ Master 播放"
            }
          ];
          this.logger = new AppLogger("FileOperationMenu");
          this.init();
        }
        // 初始化
        init() {
          this.logger.log("init");
          this.addFileItemHoverMenu();
        }
        // 添加文件项悬停菜单
        addFileItemHoverMenu() {
          document.addEventListener("mouseover", this.handleMouseOver.bind(this));
        }
        // 处理鼠标悬停事件
        handleMouseOver(event) {
          const target = event.target;
          const listItem = target.closest(
            '.list-cell li[file_type="1"]'
          );
          const isNormalItem = !!target.closest(".list-contents");
          if (!listItem || !this.isValidFileItem(listItem)) return;
          if (listItem.getAttribute("paly_button") === "1") return;
          listItem.setAttribute("paly_button", "1");
          const fileOpr = this.getFileOperationElement(listItem);
          if (fileOpr && isNormalItem) {
            this.createButtons(fileOpr, listItem);
          }
          this.addVideoEventListeners(listItem, isNormalItem);
        }
        // 获取文件操作元素
        getFileOperationElement(item) {
          const listOpr = item.querySelector(".file-opr");
          if (listOpr) return listOpr;
          const thumbOpr = item.querySelector(".file-opt");
          return thumbOpr;
        }
        // 验证文件项是否有效
        isValidFileItem(element) {
          const baseCheck = element.getAttribute("file_type") === "1" && element.getAttribute("file_mode") !== "4" && element.getAttribute("paly_button") !== "1";
          const hasDuration = element.querySelector(".duration") !== null;
          return baseCheck && hasDuration;
        }
        addVideoEventListeners(listItem, isNormalItem) {
          var _a, _b;
          const openVideo = this.createOpenVideoHandler(listItem);
          listItem.addEventListener("dblclick", openVideo);
          listItem.addEventListener("auxclick", (e) => {
            if (e.button === 1) {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              _GM_openInTab(
                new URL(
                  `/?pickcode=${listItem.getAttribute("pick_code")}&share_id=0`,
                  VOD_URL_115
                ).href,
                { active: true }
              );
            }
          });
          (_a = listItem.querySelector(".file-name .name")) == null ? undefined : _a.addEventListener("click", openVideo, true);
          (_b = listItem.querySelector(".file-thumb")) == null ? undefined : _b.addEventListener("click", openVideo, true);
          if (!isNormalItem) {
            const tooltip = document.createElement("div");
            tooltip.className = "video-operation-tooltip";
            tooltip.innerHTML = `
				<div>点击中键<br />官方播放</div>
			`;
            listItem.style.position = "relative";
            listItem.appendChild(tooltip);
            listItem.addEventListener("mouseenter", () => {
              tooltip.classList.add("show");
              setTimeout(() => {
                tooltip.style.opacity = "1";
              }, 0);
            });
            listItem.addEventListener("mouseleave", () => {
              tooltip.classList.remove("show");
              setTimeout(() => {
                tooltip.style.opacity = "0";
              }, 0);
            });
          }
        }
        // 创建打开视频处理函数
        createOpenVideoHandler(listItem) {
          return (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            const playingVideoInfo = {
              pickCode: listItem.getAttribute("pick_code"),
              title: listItem.getAttribute("title"),
              avNumber: getAvNumber(listItem.getAttribute("title")) || undefined,
              cid: listItem.getAttribute("cid"),
              size: parseInt(listItem.getAttribute("file_size"))
            };
            this.logger.log("即将播放", playingVideoInfo);
            goToPlayer(playingVideoInfo, true);
          };
        }
        // 创建文件操作菜单按钮
        createButtons(fileOpr, listItem) {
          this.ContentsMenubuttons.forEach((button) => {
            const link = this.createNormalItemButtonElement(button);
            fileOpr.prepend(link);
            this.addButtonClickHandler(link, listItem);
          });
        }
        // 创建普通文件项按钮元素
        createNormalItemButtonElement(button) {
          const link = document.createElement("a");
          link.href = "javascript:void(0)";
          link.className = button.class;
          link.title = button.title;
          link.style.cssText = "pointer-events: all; position: relative; z-index: 1000;";
          const span = document.createElement("span");
          span.textContent = button.text;
          span.style.pointerEvents = "none";
          link.appendChild(span);
          return link;
        }
        // 添加按钮点击事件处理函数
        addButtonClickHandler(link, listItem) {
          link.addEventListener("mousedown", async (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            if (link.classList.contains("115-player")) {
              _GM_openInTab(
                new URL(
                  `/?pickcode=${listItem.getAttribute("pick_code")}&share_id=0`,
                  VOD_URL_115
                ).href,
                { active: true }
              );
            } else if (link.classList.contains("master-player")) {
              const playingVideoInfo = {
                pickCode: listItem.getAttribute("pick_code"),
                title: listItem.getAttribute("title"),
                avNumber: getAvNumber(listItem.getAttribute("title")) || undefined,
                cid: listItem.getAttribute("cid"),
                size: parseInt(listItem.getAttribute("file_size"))
              };
              goToPlayer(playingVideoInfo, true);
            } else if (link.classList.contains("iina-player")) {
              try {
                const download = await Drive115Instance.getFileDownloadUrl(
                  listItem.getAttribute("pick_code")
                );
                open(webLinkIINA(download));
              } catch (error) {
                this.logger.error("打开iina失败", error);
                alert("打开iina失败");
              }
            }
          });
        }
        // 销毁
        destroy() {
          document.removeEventListener("mouseover", this.handleMouseOver.bind(this));
        }
      }
      class PageTitleMod {
        constructor() {
          this.init();
        }
        updateTitle() {
          const pathDom = document.querySelectorAll(
            ".list-topheader .top-file-path .file-path a"
          );
          const paths = Array.from(pathDom).map((item) => item.getAttribute("titletext") ?? "").filter((item) => item !== "");
          const title = (paths == null ? undefined : paths.reverse().join(" < ")) ?? "";
          if ((top == null ? undefined : top.document) && title !== "") {
            top.document.title = title;
          }
        }
        init() {
          setTimeout(() => {
            this.updateTitle();
          }, 0);
          this.mutationObserver = new MutationObserver(() => {
            this.updateTitle();
          });
          this.mutationObserver.observe(
            document.querySelector(".list-topheader .top-file-path .file-path"),
            {
              childList: true,
              subtree: true
            }
          );
        }
        destroy() {
          this.mutationObserver.disconnect();
        }
      }
      class HomePage {
        constructor() {
          this.logger = new AppLogger("HomePage");
          this.init();
        }
        async init() {
          this.logger.log("init");
          this.fileOperationMenu = new FileOperationMenu();
          this.fileListMod = new FileListMod();
          this.pageTitleMod = new PageTitleMod();
        }
        destroy() {
          this.fileOperationMenu.destroy();
          this.fileListMod.destroy();
          this.pageTitleMod.destroy();
        }
      }
      const resetDocument = () => {
        document.body.style.backgroundColor = "#000";
        document.body.style.margin = "0";
        document.body.innerHTML = `<div id="app"></div>`;
        document.title = "";
      };
      const setVideoCookie = exports("o", (cookieDetail) => {
        return new Promise((resolve, reject) => {
          const iframe = document.createElement("iframe");
          iframe.src = `${DL_URL_115}/video/token`;
          iframe.style.display = "none";
          window.addEventListener("message", (event) => {
            var _a;
            if (event.origin === DL_URL_115 && event.data.event === "ready") {
              (_a = iframe.contentWindow) == null ? undefined : _a.postMessage(
                {
                  event: "set-cookies",
                  data: cookieDetail
                },
                DL_URL_115
              );
            }
            if (event.origin === DL_URL_115 && event.data.event === "set-cookies-callback") {
              if (event.data.data) {
                reject(event.data.data);
              } else {
                resolve("success");
              }
              iframe.remove();
            }
          });
          document.body.appendChild(iframe);
        });
      });
      const videoTokenPage = () => {
        window.parent.postMessage(
          {
            event: "ready"
          },
          NORMAL_URL_115
        );
        window.addEventListener("message", (event) => {
          if (event.origin === NORMAL_URL_115 && event.data.event === "set-cookies") {
            _GM_cookie.set(event.data.data, (error) => {
              window.parent.postMessage(
                {
                  event: "set-cookies-callback",
                  data: error
                },
                NORMAL_URL_115
              );
            });
          }
        });
      };
      const videoPage = () => {
        resetDocument();
        createApp(
          defineAsyncComponent({
            loader: () => __vitePreload(() => module.import('./index-wrnPJLTU-CD1ARq5h.js'), void 0 )
          })
        ).mount("#app");
      };
      const _hoisted_1 = { class: "popup-main" };
      const _hoisted_2 = { class: "popup-desc" };
      const _hoisted_3 = { class: "user-agent-box" };
      const _sfc_main = /* @__PURE__ */ defineComponent({
        __name: "index",
        props: {
          visible: { type: Boolean }
        },
        emits: ["update:visible"],
        setup(__props, { emit: __emit }) {
          const emit = __emit;
          const userAgent = ref(navigator.userAgent);
          const close = () => {
            emit("update:visible", false);
          };
          return (_ctx, _cache) => {
            return openBlock(), createBlock(Teleport, { to: "body" }, [
              _ctx.visible ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "user-agent-popup-overlay",
                onClick: close
              }, [
                createElementVNode("div", {
                  class: "user-agent-popup",
                  onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                  }, ["stop"]))
                }, [
                  createElementVNode("div", { class: "user-agent-popup-header" }, [
                    _cache[1] || (_cache[1] = createElementVNode("h3", null, "115Master 提示", -1)),
                    createElementVNode("button", {
                      class: "close-button",
                      onClick: close
                    }, "×")
                  ]),
                  createElementVNode("div", _hoisted_1, [
                    _cache[3] || (_cache[3] = createElementVNode("div", { class: "popup-content" }, [
                      createElementVNode("div", { class: "content-icon" }, [
                        createElementVNode("span", { class: "number-icon" }, "1")
                      ]),
                      createElementVNode("div", { class: "content-text" }, [
                        createElementVNode("p", null, "现在不需要 User-Agent Switcher and Manager 插件了"),
                        createElementVNode("p", null, " 快卸载掉他吧~ "),
                        createElementVNode("p", null, " 然后刷新下页面，复活我~ ")
                      ])
                    ], -1)),
                    createElementVNode("div", _hoisted_2, [
                      _cache[2] || (_cache[2] = createElementVNode("p", null, "当前的 User-Agent", -1)),
                      createElementVNode("div", _hoisted_3, toDisplayString(userAgent.value), 1)
                    ])
                  ])
                ])
              ])) : createCommentVNode("", true)
            ]);
          };
        }
      });
      const UserAgentPopup = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8574f3b4"]]);
      const checkUserAgent = () => {
        const userAgent = navigator.userAgent;
        const is115Browser27 = userAgent.includes("115Browser/27");
        if (is115Browser27) {
          const popupContainer = document.createElement("div");
          document.body.appendChild(popupContainer);
          const app = createApp({
            render() {
              return h(UserAgentPopup, {
                visible: true,
                "onUpdate:visible": (value) => {
                  if (!value) {
                    setTimeout(() => {
                      app.unmount();
                      document.body.removeChild(popupContainer);
                    }, 300);
                  }
                }
              });
            }
          });
          app.mount(popupContainer);
          throw new Error(
            "115Master脚本启动失败: 现在不需要修改【User-Agent】请删除插件~"
          );
        }
      };
      class DebugInfo {
        constructor() {
          this.Logger = new Logger("115Master", "DebugInfo");
        }
        bootstrapInfo() {
          this.Logger.log(
            "bootstrap-info",
            `
${_GM_info.script.name} 启动成功，喜欢这个脚本的话，帮我在主页点个 Star 吧！
版本: ${_GM_info.script.version}
作者: ${_GM_info.script.author}
描述: ${_GM_info.script.description}
主页: ${_GM_info.script.homepage}
开始执行脚本时间：${performance.now()} ms
refferer: ${window.location.href}
        `
          );
        }
      }
      const debugInfo = new DebugInfo();
      debugInfo.bootstrapInfo();
      checkUserAgent();
      const routeMatch = [
        {
          match: ROUTE_MATCH.HOME,
          exec: () => new HomePage()
        },
        {
          match: ROUTE_MATCH.VIDEO,
          exec: () => videoPage()
        },
        {
          match: ROUTE_MATCH.VIDEO_TOKEN,
          exec: () => videoTokenPage()
        }
      ];
      const main = () => {
        for (const route of routeMatch) {
          if (globToRegex(route.match).test(window.location.href)) {
            route.exec();
          }
        }
      };
      if (document.readyState === "complete" || document.readyState === "interactive") {
        main();
      } else {
        window.addEventListener("DOMContentLoaded", main);
      }

    })
  };
}));

System.register("./index-wrnPJLTU-CD1ARq5h.js", ['vue', './__monkey.entry-D9DeQVnG.js', 'hls.js', 'photoswipe/lightbox', 'blueimp-md5', 'lodash', 'localforage', 'dayjs', 'm3u8-parser', 'mux.js', 'big-integer'], (function (exports, module) {
  'use strict';
  var defineComponent, ref, onMounted, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, createVNode, createCommentVNode, reactive, shallowRef, onUnmounted, computed, nextTick, normalizeStyle, Fragment, renderList, createTextVNode, toDisplayString, watch, createBlock, provide, toRef, withCtx, withDirectives, vShow, Transition, inject, resolveDynamicComponent, Teleport, mergeProps, renderSlot, isRef, createStaticVNode, _export_sfc, AppLogger, GMRequestInstance, subtitleCache, useTitle, isMac, useAsyncState, useThrottleFn, JavDB, JavBus, useStorage, M3U8Clipper, tryOnUnmounted, subtitlePreference, Drive115Instance, webLinkIINA, webLinkShortcutsMpv, goToPlayer, getAvNumber, Skeleton, formatFileSize, _GM_info, __vitePreload, LoadingError, Empty, formatDate, formatDuration, setVideoCookie, qualityNumMap, useEventListener, useVModel, onClickOutside, useElementSize, Hls, PhotoSwipeLightbox, md5, sampleSize;
  return {
    setters: [module => {
      defineComponent = module.defineComponent;
      ref = module.ref;
      onMounted = module.onMounted;
      openBlock = module.openBlock;
      createElementBlock = module.createElementBlock;
      normalizeClass = module.normalizeClass;
      unref = module.unref;
      createElementVNode = module.createElementVNode;
      createVNode = module.createVNode;
      createCommentVNode = module.createCommentVNode;
      reactive = module.reactive;
      shallowRef = module.shallowRef;
      onUnmounted = module.onUnmounted;
      computed = module.computed;
      nextTick = module.nextTick;
      normalizeStyle = module.normalizeStyle;
      Fragment = module.Fragment;
      renderList = module.renderList;
      createTextVNode = module.createTextVNode;
      toDisplayString = module.toDisplayString;
      watch = module.watch;
      createBlock = module.createBlock;
      provide = module.provide;
      toRef = module.toRef;
      withCtx = module.withCtx;
      withDirectives = module.withDirectives;
      vShow = module.vShow;
      Transition = module.Transition;
      inject = module.inject;
      resolveDynamicComponent = module.resolveDynamicComponent;
      Teleport = module.Teleport;
      mergeProps = module.mergeProps;
      renderSlot = module.renderSlot;
      isRef = module.isRef;
      createStaticVNode = module.createStaticVNode;
    }, module => {
      _export_sfc = module._;
      AppLogger = module.A;
      GMRequestInstance = module.G;
      subtitleCache = module.s;
      useTitle = module.u;
      isMac = module.i;
      useAsyncState = module.a;
      useThrottleFn = module.b;
      JavDB = module.J;
      JavBus = module.c;
      useStorage = module.d;
      M3U8Clipper = module.M;
      tryOnUnmounted = module.t;
      subtitlePreference = module.e;
      Drive115Instance = module.D;
      webLinkIINA = module.w;
      webLinkShortcutsMpv = module.f;
      goToPlayer = module.g;
      getAvNumber = module.h;
      Skeleton = module.S;
      formatFileSize = module.j;
      _GM_info = module.k;
      __vitePreload = module.l;
      LoadingError = module.L;
      Empty = module.E;
      formatDate = module.m;
      formatDuration = module.n;
      setVideoCookie = module.o;
      qualityNumMap = module.q;
      useEventListener = module.p;
      useVModel = module.r;
      onClickOutside = module.v;
      useElementSize = module.x;
    }, module => {
      Hls = module.default;
    }, module => {
      PhotoSwipeLightbox = module.default;
    }, module => {
      md5 = module.default;
    }, module => {
      sampleSize = module.sampleSize;
    }, null, null, null, null, null],
    execute: (function () {

      const useControls = (ctx) => {
        const visible = shallowRef(true);
        const isMouseInControls = shallowRef(false);
        const isMouseInPopup = shallowRef(false);
        let hideControlsTimer = null;
        const setIsMouseInControls = (value) => {
          isMouseInControls.value = value;
          if (value) {
            hideControlsTimer = null;
          }
        };
        const setIsMouseInPopup = (value) => {
          isMouseInPopup.value = value;
        };
        const show = () => {
          visible.value = true;
        };
        const hide = () => {
          visible.value = false;
        };
        const clearHideControlsTimer = () => {
          if (hideControlsTimer) {
            clearTimeout(hideControlsTimer);
            hideControlsTimer = null;
          }
        };
        const showWithAutoHide = () => {
          show();
          hideWithDelay();
        };
        const hideWithDelay = () => {
          clearHideControlsTimer();
          hideControlsTimer = window.setTimeout(() => {
            var _a;
            if (isMouseInControls.value || isMouseInPopup.value || ((_a = ctx.progressBar) == null ? undefined : _a.isDragging.value)) {
              return;
            }
            hide();
          }, 1e3);
        };
        const handleRootMouseMove = () => {
          showWithAutoHide();
        };
        const handleRootMouseLeave = async () => {
          var _a, _b;
          if (isMouseInPopup.value) {
            return;
          }
          if ((_a = ctx.progressBar) == null ? undefined : _a.isDragging.value) {
            await ((_b = ctx.progressBar) == null ? undefined : _b.waitDragEnd());
            return hideWithDelay();
          }
          clearHideControlsTimer();
          hide();
        };
        useEventListener(ctx.refs.rootRef, "mousemove", handleRootMouseMove);
        useEventListener(ctx.refs.rootRef, "mouseleave", handleRootMouseLeave);
        onUnmounted(() => {
          clearHideControlsTimer();
        });
        return {
          visible,
          show,
          hide,
          showWithAutoHide,
          hideWithDelay,
          clearHideControlsTimer,
          setIsMouseInControls,
          setIsMouseInPopup
        };
      };
      function useFullscreen(ctx) {
        const isFullscreen = shallowRef(false);
        const theatre = useVModel(ctx.rootProps, "theatre", ctx.rootEmit);
        const handleFullscreenChange = () => {
          isFullscreen.value = !!document.fullscreenElement;
        };
        const toggleFullscreen = async () => {
          try {
            if (!document.fullscreenElement) {
              window.scrollTo(0, 0);
              await document.documentElement.requestFullscreen();
            } else {
              await document.exitFullscreen();
            }
          } catch (error) {
            console.error("Failed to toggle fullscreen:", error);
          }
        };
        const toggleTheatre = async () => {
          var _a, _b;
          const newValue = !theatre.value;
          if (newValue) {
            if (isFullscreen.value) {
              await toggleFullscreen();
            }
          }
          if ((_a = ctx.pictureInPicture) == null ? undefined : _a.isPip.value) {
            await ((_b = ctx.pictureInPicture) == null ? undefined : _b.close());
          }
          theatre.value = newValue;
        };
        useEventListener(document, "fullscreenchange", handleFullscreenChange);
        useEventListener(document, "webkitfullscreenchange", handleFullscreenChange);
        useEventListener(document, "mozfullscreenchange", handleFullscreenChange);
        useEventListener(document, "MSFullscreenChange", handleFullscreenChange);
        return {
          theatre,
          isFullscreen,
          toggleFullscreen,
          toggleTheatre
        };
      }
      const MODIFIERS = {
        Shift: "Shift",
        Alt: "Alt",
        Control: "Control",
        Meta: "Meta"
      };
      const KEYS = {
        sapce: " ",
        arrowLeft: "ArrowLeft",
        arrowRight: "ArrowRight",
        arrowUp: "ArrowUp",
        arrowDown: "ArrowDown",
        w: "w",
        a: "a",
        s: "s",
        d: "d",
        c: "c",
        f: "f",
        p: "p",
        m: "m",
        v: "v",
        W: "W",
        A: "A",
        S: "S",
        D: "D",
        C: "C",
        F: "F",
        P: "P",
        M: "M",
        V: "V",
        "0": "0",
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
        "-": "-",
        "=": "=",
        "[": "[",
        "]": "]",
        "\\": "\\",
        h: "h",
        j: "j",
        k: "k",
        l: "l",
        H: "H",
        J: "J",
        K: "K",
        L: "L",
        r: "r",
        R: "R"
      };
      const HOT_KEYS_CONFIG = {
        progress: {
          keys: [
            KEYS["0"],
            KEYS["1"],
            KEYS["2"],
            KEYS["3"],
            KEYS["4"],
            KEYS["5"],
            KEYS["6"],
            KEYS["7"],
            KEYS["8"],
            KEYS["9"]
          ],
          name: "进度",
          keydown: (ctx, event) => {
            var _a;
            const key = event.key;
            const digit = Number(key);
            const percentage = digit / 10;
            (_a = ctx.progress) == null ? undefined : _a.skip(percentage, true);
            if (ctx.hud) {
              ctx.hud.showProgressJump(digit);
            }
          }
        },
        fastBackward: {
          keys: [KEYS.arrowLeft, KEYS.a, KEYS.A],
          name: "快退",
          keydown: (ctx) => {
            var _a;
            (_a = ctx.progress) == null ? undefined : _a.skip(-5);
          }
        },
        fastForward: {
          keys: [KEYS.arrowRight, KEYS.d, KEYS.D],
          name: "快进",
          keydown: (ctx, event) => {
            var _a, _b;
            if (event.repeat) {
              (_a = ctx.playbackRate) == null ? undefined : _a.startLongPressFastForward();
            } else {
              (_b = ctx.progress) == null ? undefined : _b.skip(5);
            }
          },
          keyup: (ctx) => {
            var _a, _b;
            if ((_a = ctx.playbackRate) == null ? undefined : _a.fastForward.value) {
              (_b = ctx.playbackRate) == null ? undefined : _b.stopLongPressFastForward();
            }
          }
        },
        playbackRateUp: {
          keys: [KEYS.arrowUp, KEYS.w, KEYS.W],
          name: "播放速度增大",
          keydown: (ctx) => {
            var _a;
            (_a = ctx.playbackRate) == null ? undefined : _a.up();
          }
        },
        playbackRateDown: {
          keys: [KEYS.arrowDown, KEYS.s, KEYS.S],
          name: "播放速度减小",
          keydown: (ctx, event) => {
            var _a, _b;
            if (event.repeat) {
              (_a = ctx.playbackRate) == null ? undefined : _a.downWithLowerLimit();
            } else {
              (_b = ctx.playbackRate) == null ? undefined : _b.down();
            }
          }
        },
        volumeUp: {
          keys: [KEYS["="]],
          name: "音量增大",
          keydown: (ctx) => {
            var _a;
            (_a = ctx.volume) == null ? undefined : _a.adjustVolume(5);
          }
        },
        volumeDown: {
          keys: [KEYS["-"]],
          name: "音量减小",
          keydown: (ctx) => {
            var _a;
            (_a = ctx.volume) == null ? undefined : _a.adjustVolume(-5);
          }
        },
        togglePlay: {
          keys: [KEYS.sapce],
          name: "播放/暂停",
          keydown: (ctx) => {
            var _a;
            (_a = ctx.playing) == null ? undefined : _a.togglePlay();
          }
        },
        toggleMute: {
          keys: [KEYS.m],
          name: "切换静音",
          keydown: (ctx) => {
            var _a;
            (_a = ctx.volume) == null ? undefined : _a.toggleMute();
          }
        },
        toggleSubtitle: {
          keys: [KEYS.c, KEYS.C],
          name: "切换字幕",
          keydown: (ctx) => {
            var _a, _b, _c;
            if (((_a = ctx.subtitles) == null ? undefined : _a.loading.value) || !((_b = ctx.subtitles) == null ? undefined : _b.ready.value)) {
              return;
            }
            (_c = ctx.subtitles) == null ? undefined : _c.toggleEnabled();
          }
        },
        toggleFullscreen: {
          keys: [KEYS.f, KEYS.F],
          name: "切换全屏",
          keydown: (ctx) => {
            var _a;
            (_a = ctx.fullscreen) == null ? undefined : _a.toggleFullscreen();
          }
        },
        toggleTheaterMode: {
          keys: [KEYS.v, KEYS.V],
          name: "切换剧院模式",
          keydown: (ctx) => {
            var _a;
            (_a = ctx.fullscreen) == null ? undefined : _a.toggleTheatre();
          }
        },
        togglePictureInPicture: {
          keys: [KEYS.p, KEYS.P],
          name: "切换画中画",
          keydown: (ctx) => {
            var _a;
            (_a = ctx.pictureInPicture) == null ? undefined : _a.toggle();
          }
        },
        rotateLeft: {
          keys: [KEYS["["], KEYS.l, KEYS.L],
          name: "向左旋转",
          keydown: (ctx) => {
            var _a;
            (_a = ctx.transform) == null ? undefined : _a.left();
          }
        },
        rotateRight: {
          keys: [KEYS["]"], KEYS.r, KEYS.R],
          name: "向右旋转",
          keydown: (ctx) => {
            var _a;
            (_a = ctx.transform) == null ? undefined : _a.right();
          }
        },
        resetRotation: {
          keys: [KEYS["\\"]],
          name: "重置旋转",
          keydown: (ctx) => {
            var _a;
            (_a = ctx.transform) == null ? undefined : _a.normal();
          }
        },
        toggleFlipX: {
          keys: [KEYS.h, KEYS.H],
          name: "水平翻转",
          keydown: (ctx) => {
            var _a;
            (_a = ctx.transform) == null ? undefined : _a.toggleFlipX();
          }
        },
        toggleFlipY: {
          keys: [KEYS.j, KEYS.J],
          name: "垂直翻转",
          keydown: (ctx) => {
            var _a;
            (_a = ctx.transform) == null ? undefined : _a.toggleFlipY();
          }
        }
      };
      const parseKeyConfig = (key) => {
        return new Set(key.split("+").filter((item) => item !== ""));
      };
      const preseKeyEvent = (event) => {
        const modifiers = [
          event.altKey ? MODIFIERS.Alt : null,
          event.shiftKey ? MODIFIERS.Shift : null,
          event.ctrlKey ? MODIFIERS.Control : null,
          event.metaKey ? MODIFIERS.Meta : null
        ].filter((item) => !!item);
        return /* @__PURE__ */ new Set([...modifiers, event.key]);
      };
      const isSame = (eventSet, configSet) => {
        return eventSet.size === configSet.size && Array.from(configSet).every((key) => eventSet.has(key));
      };
      const matchKey = (event) => {
        const eventSet = preseKeyEvent(event);
        for (const config of Object.values(HOT_KEYS_CONFIG)) {
          for (const key of config.keys) {
            const configSet = parseKeyConfig(key);
            if (isSame(eventSet, configSet)) {
              return { key, config };
            }
          }
        }
        return null;
      };
      function useHotKey(ctx) {
        const handleKeydown = (event) => {
          if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
            return;
          }
          const match = matchKey(event);
          if (match == null ? undefined : match.key) {
            event.preventDefault();
            match.config.keydown(ctx, event, match);
          }
        };
        const handleKeyup = (event) => {
          var _a, _b;
          const match = matchKey(event);
          if (match == null ? undefined : match.key) {
            event.preventDefault();
            (_b = (_a = match.config).keyup) == null ? undefined : _b.call(_a, ctx, event, match);
          }
        };
        useEventListener("keydown", handleKeydown);
        useEventListener("keyup", handleKeyup);
      }
      const DEFAULT_DURATION = 1500;
      const useHud = (ctx) => {
        const currentMessage = ref(null);
        let timeoutId = null;
        const messages = computed(() => {
          return currentMessage.value ? [currentMessage.value] : [];
        });
        const show = (message) => {
          const timestamp = Date.now();
          const duration = message.duration || DEFAULT_DURATION;
          if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          currentMessage.value = {
            ...message,
            timestamp
          };
          timeoutId = window.setTimeout(() => {
            currentMessage.value = null;
            timeoutId = null;
          }, duration);
        };
        const clear = () => {
          if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          currentMessage.value = null;
        };
        const showProgressJump = (digit) => {
          var _a;
          const percentage = digit / 10;
          const targetTime = percentage * (((_a = ctx.progress) == null ? undefined : _a.duration.value) || 0);
          const minutes = Math.floor(targetTime / 60);
          const seconds = Math.floor(targetTime % 60);
          const timeString = `${minutes}:${seconds.toString().padStart(2, "0")}`;
          show({
            type: "fastForward",
            title: digit === 0 ? "跳转到开头" : `跳转到 ${digit}0%`,
            data: {
              value: timeString,
              max: 100,
              min: 0,
              progress: percentage * 100
            },
            duration: 1500
          });
        };
        const showMessage = (type, title, value, options) => {
          show({
            type,
            title,
            data: {
              value,
              max: options == null ? undefined : options.max,
              min: options == null ? undefined : options.min
            },
            duration: options == null ? undefined : options.duration
          });
        };
        const getCurrentProgressPercentage = () => {
          if (!ctx.progress) return 0;
          return ctx.progress.duration.value > 0 ? ctx.progress.currentTime.value / ctx.progress.duration.value * 100 : 0;
        };
        if (ctx.volume) {
          const { volume, muted } = ctx.volume;
          watch(volume, (newVolume, oldVolume) => {
            if (oldVolume === undefined) return;
            showMessage("volume", "音量", newVolume, {
              max: 100,
              min: 0
            });
          });
          watch(muted, (newMuted) => {
            showMessage("mute", newMuted ? "静音" : "取消静音");
          });
        }
        if (ctx.playbackRate) {
          const { current } = ctx.playbackRate;
          watch(current, (newRate, oldRate) => {
            if (oldRate === undefined) return;
            showMessage("speed", "播放速度", newRate);
          });
        }
        if (ctx.subtitles) {
          const { current } = ctx.subtitles;
          watch(current, (newSubtitle) => {
            showMessage("subtitle", "字幕", newSubtitle ? newSubtitle.label : "关闭");
          });
        }
        if (ctx.transform) {
          const { rotate, flipX, flipY } = ctx.transform;
          watch(rotate, (newRotate, oldRotate) => {
            if (oldRotate === undefined) return;
            showMessage("transform", "旋转", `${newRotate}°`);
          });
          watch(flipX, (newFlipX) => {
            showMessage("transform", "水平翻转", newFlipX ? "开启" : "关闭");
          });
          watch(flipY, (newFlipY) => {
            showMessage("transform", "垂直翻转", newFlipY ? "开启" : "关闭");
          });
        }
        if (ctx.progress) {
          const originalSkip = ctx.progress.skip;
          ctx.progress.skip = (value, isPercent) => {
            originalSkip(value, isPercent);
            if (!isPercent) {
              const currentProgress = getCurrentProgressPercentage();
              show({
                type: value > 0 ? "fastForward" : "fastBackward",
                title: value > 0 ? "快进" : "快退",
                data: {
                  value: `${Math.abs(value)}秒`,
                  max: 100,
                  min: 0,
                  // 直接把当前进度作为消息的属性
                  progress: currentProgress
                },
                duration: DEFAULT_DURATION
              });
            }
          };
        }
        if (ctx.playbackRate) {
          const originalStartLongPress = ctx.playbackRate.startLongPressFastForward;
          const originalStopLongPress = ctx.playbackRate.stopLongPressFastForward;
          if (originalStartLongPress && originalStopLongPress) {
            ctx.playbackRate.startLongPressFastForward = () => {
              var _a;
              originalStartLongPress();
              const currentProgress = getCurrentProgressPercentage();
              show({
                type: "fastForward",
                title: "快速播放",
                data: {
                  value: `${((_a = ctx.playbackRate) == null ? undefined : _a.MAX_RATE) || 15}x`,
                  max: 100,
                  min: 0,
                  progress: currentProgress
                },
                duration: 2e3
              });
            };
            ctx.playbackRate.stopLongPressFastForward = () => {
              originalStopLongPress();
              clear();
            };
          }
        }
        onUnmounted(() => {
          if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
        });
        return {
          messages,
          show,
          clear,
          showProgressJump
        };
      };
      const usePictureInPicture = (ctx) => {
        const videoElementRef = ctx.refs.videoElementRef;
        const isPip = shallowRef(!!document.pictureInPictureElement);
        const isSupport = "pictureInPictureEnabled" in document;
        const toggle = async () => {
          var _a;
          try {
            if (isPip.value && document.pictureInPictureElement) {
              await document.exitPictureInPicture();
            } else {
              await ((_a = videoElementRef.value) == null ? void 0 : _a.requestPictureInPicture());
            }
          } catch (error) {
            console.error("Failed to toggle picture in picture:", error);
          }
        };
        const close = async () => {
          if (isPip.value && document.pictureInPictureElement) {
            await document.exitPictureInPicture();
          }
        };
        const handlePipChange = () => {
          isPip.value = !!document.pictureInPictureElement;
        };
        useEventListener(document, "enterpictureinpicture", handlePipChange);
        useEventListener(document, "leavepictureinpicture", handlePipChange);
        return {
          /** 当前浏览器是否支持画中画 */
          isSupport,
          /** 当前是否处于画中画模式 */
          isPip,
          /** 切换画中画模式 */
          toggle,
          /** 关闭画中画模式 */
          close
        };
      };
      const usePlaybackRate = (ctx) => {
        const videoElementRef = ctx.refs.videoElementRef;
        const NORMAL_RATE = 1;
        const MIN_RATE = 0.3;
        const MAX_RATE = 15;
        const rateOptions = shallowRef([
          MIN_RATE,
          0.5,
          0.7,
          NORMAL_RATE,
          1.3,
          1.5,
          1.7,
          2,
          3,
          5,
          10,
          MAX_RATE
        ]);
        const current = useVModel(ctx.rootProps, "playbackRate", ctx.rootEmit);
        const currentRateIndex = computed(
          () => rateOptions.value.findIndex((r) => r === current.value) ?? -1
        );
        const fastForward = shallowRef(false);
        const set = (rate) => {
          if (!videoElementRef.value) return;
          videoElementRef.value.playbackRate = rate;
          current.value = rate;
        };
        const setByIndex = (index2) => {
          if (index2 < 0 || index2 >= rateOptions.value.length) return;
          const newRate = rateOptions.value[index2];
          set(newRate);
        };
        const up = () => {
          setByIndex(currentRateIndex.value + 1);
        };
        const down = () => {
          setByIndex(currentRateIndex.value - 1);
        };
        const downWithLowerLimit = () => {
          if (current.value <= NORMAL_RATE) return;
          setByIndex(currentRateIndex.value - 1);
        };
        const startLongPressFastForward = () => {
          if (!videoElementRef.value) return;
          fastForward.value = true;
          videoElementRef.value.playbackRate = MAX_RATE;
          if (videoElementRef.value.paused) {
            videoElementRef.value.play();
          }
        };
        const stopLongPressFastForward = () => {
          if (!videoElementRef.value) return;
          fastForward.value = false;
          videoElementRef.value.playbackRate = current.value;
        };
        useEventListener(videoElementRef, "canplay", () => {
          if (!videoElementRef.value) return;
          videoElementRef.value.playbackRate = current.value;
        });
        return {
          MIN_RATE,
          MAX_RATE,
          NORMAL_RATE,
          current,
          rateOptions,
          fastForward,
          set,
          up,
          down,
          downWithLowerLimit,
          startLongPressFastForward,
          stopLongPressFastForward
        };
      };
      const usePlaying = (ctx) => {
        const videoElementRef = ctx.refs.videoElementRef;
        const isPlaying = shallowRef(false);
        const autoplay = shallowRef(true);
        const loop = shallowRef(false);
        const isLoading = shallowRef(false);
        const updatePlayingState = () => {
          if (!videoElementRef.value) return;
          isPlaying.value = !videoElementRef.value.paused;
        };
        const togglePlay = async () => {
          if (!videoElementRef.value) return;
          try {
            if (videoElementRef.value.paused) {
              await videoElementRef.value.play();
            } else {
              videoElementRef.value.pause();
            }
          } catch (error) {
            console.error("Failed to toggle play state:", error);
          }
        };
        const showLoading = () => {
          isLoading.value = true;
        };
        const cancelLoading = () => {
          isLoading.value = false;
        };
        useEventListener(videoElementRef, "play", updatePlayingState);
        useEventListener(videoElementRef, "pause", updatePlayingState);
        useEventListener(videoElementRef, "playing", updatePlayingState);
        useEventListener(videoElementRef, "ended", updatePlayingState);
        useEventListener(videoElementRef, "waiting", showLoading);
        useEventListener(videoElementRef, "canplay", cancelLoading);
        return {
          loop,
          autoplay,
          isPlaying,
          isLoading,
          togglePlay
        };
      };
      const useProgress = (ctx) => {
        const videoElementRef = ctx.refs.videoElementRef;
        const currentTime = shallowRef(0);
        const duration = shallowRef(0);
        const buffered = shallowRef(0);
        const progress = shallowRef(0);
        const seekTo = (time) => {
          if (!videoElementRef.value) return;
          currentTime.value = time;
          progress.value = time / duration.value * 100;
          videoElementRef.value.currentTime = time;
          ctx.rootEmit("updateCurrentTime", {
            time,
            isManual: true
          });
        };
        const updateProgress = () => {
          if (!videoElementRef.value) return;
          currentTime.value = videoElementRef.value.currentTime;
          duration.value = videoElementRef.value.duration;
          progress.value = currentTime.value / duration.value * 100;
          ctx.rootEmit("updateCurrentTime", {
            time: videoElementRef.value.currentTime,
            isManual: false
          });
        };
        const updateBuffer = () => {
          if (!videoElementRef.value) return;
          const timeRanges = videoElementRef.value.buffered;
          if (timeRanges.length > 0) {
            buffered.value = timeRanges.end(timeRanges.length - 1) / videoElementRef.value.duration * 100;
          }
        };
        const skip = (value, isPercent = false) => {
          if (!videoElementRef.value) return;
          const newTime = isPercent ? value * duration.value : currentTime.value + value;
          const clampedTime = Math.min(Math.max(0, newTime), duration.value);
          seekTo(clampedTime);
        };
        useEventListener(videoElementRef, "timeupdate", updateProgress);
        useEventListener(videoElementRef, "loadedmetadata", updateProgress);
        useEventListener(videoElementRef, "progress", updateBuffer);
        return {
          currentTime,
          duration,
          buffered,
          progress,
          seekTo,
          skip
        };
      };
      const useProgressBar = (_ctx) => {
        const isDragging = shallowRef(false);
        const waitDragEnd = () => {
          return new Promise((resolve) => {
            const unwatch = watch(isDragging, (value) => {
              if (!value) {
                resolve(true);
                unwatch();
              }
            });
          });
        };
        return {
          isDragging,
          waitDragEnd
        };
      };
      function useHls(videoElement) {
        const instance = shallowRef(null);
        const isSupported = Hls.isSupported();
        const initHls = (url, config = {}) => {
          if (!isSupported) {
            console.warn("HLS is not supported in this browser");
            return false;
          }
          if (!videoElement.value) {
            console.warn("videoElement is null");
            return false;
          }
          instance.value = new Hls({
            autoStartLoad: true,
            startPosition: -1,
            debug: false,
            ...config
          });
          instance.value.loadSource(url);
          instance.value.attachMedia(videoElement.value);
          return true;
        };
        const destroy = () => {
          if (instance.value) {
            instance.value.destroy();
            instance.value = null;
          }
        };
        return {
          instance,
          isSupported,
          initHls,
          destroy
        };
      }
      const useSource = (ctx) => {
        const videoElementRef = ctx.refs.videoElementRef;
        const list = ctx.rootProps.sources;
        const current = ref(null);
        const videoKey = computed(() => {
          var _a;
          return (_a = current.value) == null ? undefined : _a.url;
        });
        const hls = useHls(videoElementRef);
        const cleanupRef = shallowRef(() => undefined);
        const isInterrupt = shallowRef(false);
        const initializeVideo = async (source) => {
          let promise;
          current.value = source;
          await nextTick();
          if (!videoElementRef.value) {
            throw new Error("videoElementRef is not found");
          }
          if (videoElementRef.value.src) {
            videoElementRef.value.src = "";
          }
          if (source.type === "hls") {
            hls.initHls(source.url, source.hlsConfig);
          } else {
            videoElementRef.value.src = source.url;
            videoElementRef.value.load();
            promise = videoElementRef.value.play().catch(async (error) => {
              if (error instanceof DOMException && error.name === "AbortError") {
                return;
              }
              if (error instanceof DOMException && error.name === "NotSupportedError") {
                console.warn(
                  "Unsupported video sources, try switching to the next video source"
                );
                const { promise: nextPromise, clear: nextClear } = await initializeVideo(list.value[1]);
                cleanupRef.value = nextClear;
                promise = nextPromise;
                return;
              }
              throw error;
            });
          }
          const clear = () => {
            if (videoElementRef.value) {
              videoElementRef.value.src = "";
              hls.destroy();
            }
          };
          return { promise, clear };
        };
        const changeQuality = async (source) => {
          var _a, _b, _c;
          const currentTime = ((_a = videoElementRef.value) == null ? undefined : _a.currentTime) || 0;
          const wasPlaying = !((_b = videoElementRef.value) == null ? undefined : _b.paused);
          (_c = cleanupRef.value) == null ? undefined : _c.call(cleanupRef);
          const { clear } = await initializeVideo(source);
          cleanupRef.value = clear;
          if (videoElementRef.value) {
            videoElementRef.value.currentTime = currentTime;
            if (wasPlaying) {
              videoElementRef.value.play();
            }
          }
        };
        const interruptSource = () => {
          var _a;
          isInterrupt.value = true;
          (_a = cleanupRef.value) == null ? undefined : _a.call(cleanupRef);
        };
        const resumeSource = () => {
          isInterrupt.value = false;
          initializeVideo(current.value);
        };
        watch(
          list,
          async () => {
            var _a;
            (_a = cleanupRef.value) == null ? undefined : _a.call(cleanupRef);
            isInterrupt.value = false;
            if (list.value.length === 0) {
              return;
            }
            const { clear } = await initializeVideo(list.value[0]);
            cleanupRef.value = clear;
          },
          { immediate: true, deep: true }
        );
        return {
          videoKey,
          list,
          current,
          changeQuality,
          interruptSource,
          resumeSource,
          isInterrupt
        };
      };
      const useSubtitles = (ctx) => {
        const ready = ref(false);
        const videoElementRef = ctx.refs.videoElementRef;
        const current = ref(null);
        const previousSubtitle = ref(null);
        const defaultSubtitle = computed(() => {
          var _a, _b;
          return ((_a = ctx.rootProps.subtitles.value) == null ? undefined : _a.find((s) => s.default)) ?? ((_b = ctx.rootProps.subtitles.value) == null ? undefined : _b[0]) ?? null;
        });
        const changeTrack = (subtitle) => {
          var _a, _b;
          const tracks = (_a = videoElementRef.value) == null ? undefined : _a.textTracks;
          if (tracks) {
            for (let i = 0; i < tracks.length; i++) {
              tracks[i].mode = "disabled";
            }
            if (subtitle) {
              const index2 = ((_b = ctx.rootProps.subtitles.value) == null ? undefined : _b.findIndex(
                (s) => s.url === subtitle.url
              )) ?? -1;
              if (index2 >= 0 && tracks[index2]) {
                tracks[index2].mode = "showing";
              }
            }
          }
        };
        const change = (subtitle) => {
          var _a, _b;
          if (subtitle) {
            previousSubtitle.value = subtitle;
          }
          current.value = subtitle;
          changeTrack(subtitle);
          (_b = (_a = ctx.rootProps).onSubtitleChange) == null ? undefined : _b.call(_a, subtitle);
        };
        const switchEnabled = (_enabled) => {
        };
        const toggleEnabled = () => {
          if (current.value) {
            change(null);
          } else if (previousSubtitle.value) {
            change(previousSubtitle.value);
          } else {
            change(defaultSubtitle.value ?? null);
          }
        };
        const restoreLastSubtitle = (subtitles) => {
          const defaultSubtitle2 = subtitles.find((s) => s.default);
          if (defaultSubtitle2) {
            change(defaultSubtitle2);
          }
        };
        const restoreCurrentSubtitle = () => {
          if (current.value) {
            change(current.value);
          }
        };
        watch(ctx.rootProps.subtitles, (newSubtitles) => {
          ready.value = true;
          if (newSubtitles) {
            restoreLastSubtitle(newSubtitles);
          }
        });
        watch(
          () => {
            var _a;
            return (_a = ctx.source) == null ? undefined : _a.current;
          },
          (newSource) => {
            if (newSource) {
              restoreCurrentSubtitle();
            }
          }
        );
        return {
          list: ctx.rootProps.subtitles,
          loading: ctx.rootProps.subtitlesLoading,
          ready: ctx.rootProps.subtitlesReady,
          current,
          change,
          switchEnabled,
          toggleEnabled,
          restoreCurrentSubtitle
        };
      };
      const useThumbnailSettings = (ctx) => {
        const preferences = ctx.rootProps.preferences;
        if (!preferences) {
          throw new Error("播放器的 preferences 配置不存在，请先配置");
        }
        const toggleAutoLoad = () => {
          preferences.autoLoadThumbnails = !preferences.autoLoadThumbnails;
        };
        const toggleSuperBuffer = () => {
          preferences.superAutoBuffer = !preferences.superAutoBuffer;
        };
        return {
          // 状态
          autoLoadThumbnails: toRef(preferences, "autoLoadThumbnails"),
          superAutoBuffer: toRef(preferences, "superAutoBuffer"),
          // 方法
          toggleAutoLoad,
          toggleSuperBuffer
        };
      };
      const maintainRectangleHeight = (width, height, angle) => {
        const radians = angle * Math.PI / 180;
        const newHeight = Math.abs(width * Math.sin(radians)) + Math.abs(height * Math.cos(radians));
        const scale = height / newHeight;
        return scale;
      };
      const useTransform = (_ctx) => {
        const WIDTH_RATIO = 16;
        const HEIGHT_RATIO = 9;
        const ROTATE_ANGLE = 90;
        const MAX_ROTATE_ANGLE = 270;
        const rotate = shallowRef(0);
        const flipX = shallowRef(false);
        const flipY = shallowRef(false);
        const scale = computed(() => {
          return maintainRectangleHeight(WIDTH_RATIO, HEIGHT_RATIO, rotate.value);
        });
        const style = computed(() => {
          const transforms = [
            `rotate(${rotate.value}deg)`,
            `scale(${scale.value * (flipX.value ? -1 : 1)}, ${scale.value * (flipY.value ? -1 : 1)})`
          ];
          return {
            transform: transforms.join(" ")
          };
        });
        const isLeftDisabled = computed(() => {
          return rotate.value === -270;
        });
        const isRightDisabled = computed(() => {
          return rotate.value === MAX_ROTATE_ANGLE;
        });
        const left = () => {
          if (rotate.value <= -270) return;
          const newAngle = rotate.value - ROTATE_ANGLE;
          rotate.value = Math.max(newAngle, -270);
        };
        const right = () => {
          if (rotate.value >= MAX_ROTATE_ANGLE) return;
          const newAngle = rotate.value + ROTATE_ANGLE;
          rotate.value = Math.min(newAngle, MAX_ROTATE_ANGLE);
        };
        const normal = () => {
          rotate.value = 0;
          flipX.value = false;
          flipY.value = false;
        };
        const toggleFlipX = () => {
          flipX.value = !flipX.value;
        };
        const toggleFlipY = () => {
          flipY.value = !flipY.value;
        };
        return {
          rotate,
          flipX,
          flipY,
          left,
          right,
          normal,
          toggleFlipX,
          toggleFlipY,
          isLeftDisabled,
          isRightDisabled,
          transformStyle: style
        };
      };
      const useVolume = (context) => {
        const videoElementRef = context.refs.videoElementRef;
        const volume = useVModel(context.rootProps, "volume", context.rootEmit);
        const muted = useVModel(context.rootProps, "muted", context.rootEmit);
        const setVolume = (value) => {
          if (!videoElementRef.value) return;
          videoElementRef.value.volume = value / 100;
          volume.value = value;
          muted.value = value === 0;
        };
        const toggleMute = () => {
          if (!videoElementRef.value) return;
          videoElementRef.value.muted = !videoElementRef.value.muted;
          muted.value = videoElementRef.value.muted;
        };
        const adjustVolume = (delta) => {
          if (!videoElementRef.value) return;
          const newVolume = Math.min(Math.max(0, volume.value + delta), 100);
          setVolume(newVolume);
        };
        return {
          volume,
          muted,
          setVolume,
          toggleMute,
          adjustVolume
        };
      };
      const PlayerSymbol = Symbol("XPlayer");
      function usePlayerProvide(rootProps, rootEmit, refs) {
        const context = {
          refs: {
            rootRef: refs.rootRef,
            videoElementRef: refs.videoElementRef,
            videoMaskRef: refs.videoMaskRef
          },
          rootProps,
          rootEmit,
          fullscreen: undefined,
          volume: undefined,
          playbackRate: undefined,
          progress: undefined,
          progressBar: undefined,
          playing: undefined,
          controls: undefined,
          subtitles: undefined,
          source: undefined,
          hotKey: undefined,
          thumbnailSettings: undefined
        };
        const volume = useVolume(context);
        context.volume = volume;
        const playbackRate = usePlaybackRate(context);
        context.playbackRate = playbackRate;
        const fullscreen = useFullscreen(context);
        context.fullscreen = fullscreen;
        const progress = useProgress(context);
        context.progress = progress;
        const progressBar = useProgressBar();
        context.progressBar = progressBar;
        const playing = usePlaying(context);
        context.playing = playing;
        const controls = useControls(context);
        context.controls = controls;
        const subtitles = useSubtitles(context);
        context.subtitles = subtitles;
        const source = useSource(context);
        context.source = source;
        const hotKey = useHotKey(context);
        context.hotKey = hotKey;
        const pictureInPicture = usePictureInPicture(context);
        context.pictureInPicture = pictureInPicture;
        const transform = useTransform();
        context.transform = transform;
        const thumbnailSettings = useThumbnailSettings(context);
        context.thumbnailSettings = thumbnailSettings;
        const hud = useHud(context);
        context.hud = hud;
        provide(PlayerSymbol, context);
        return context;
      }
      function usePlayerContext() {
        const context = inject(PlayerSymbol);
        if (!context) {
          throw new Error(
            "usePlayerContext must be used within a VideoPlayer component"
          );
        }
        return context;
      }
      const _hoisted_1$J = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$n(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$J, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M180-180h103q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150q-12.75 0-21.37-8.63Q120-137.25 120-150v-133q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38zm600 0v-103q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v133q0 12.75-8.62 21.37Q822.75-120 810-120H677q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5zM180-780v103q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-133q0-12.75 8.63-21.38Q137.25-840 150-840h133q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5zm600 0H677q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h133q12.75 0 21.38 8.62Q840-822.75 840-810v133q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37z" }, null, -1)
        ]));
      }
      const Fullscreen = { render: render$n };
      const _hoisted_1$I = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$m(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$I, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M253-253H150q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h133q12.75 0 21.38 8.62Q313-295.75 313-283v133q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37zm454 0v103q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-133q0-12.75 8.63-21.38Q664.25-313 677-313h133q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5zM253-707v-103q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v133q0 12.75-8.62 21.37Q295.75-647 283-647H150q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5zm454 0h103q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H677q-12.75 0-21.37-8.63Q647-664.25 647-677v-133q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38z" }, null, -1)
        ]));
      }
      const FullscreenExit = { render: render$m };
      const _sfc_main$r = /* @__PURE__ */ defineComponent({
        __name: "index",
        props: {
          svg: {},
          size: {},
          color: {}
        },
        setup(__props) {
          return (_ctx, _cache) => {
            return openBlock(), createBlock(resolveDynamicComponent(_ctx.svg), {
              class: "icon",
              style: normalizeStyle({ width: _ctx.size, height: _ctx.size, color: _ctx.color })
            }, null, 8, ["style"]);
          };
        }
      });
      const Icon = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-6e980ff6"]]);
      const _hoisted_1$H = ["title"];
      const _sfc_main$q = /* @__PURE__ */ defineComponent({
        __name: "FullscreenButton",
        setup(__props) {
          const { fullscreen } = usePlayerContext();
          return (_ctx, _cache) => {
            return openBlock(), createElementBlock("button", {
              title: unref(fullscreen).isFullscreen.value ? "退出全屏(F)" : "全屏(F)",
              onClick: _cache[0] || (_cache[0] = //@ts-ignore
              (...args) => unref(fullscreen).toggleFullscreen && unref(fullscreen).toggleFullscreen(...args))
            }, [
              createVNode(Icon, {
                svg: unref(fullscreen).isFullscreen.value ? unref(FullscreenExit) : unref(Fullscreen),
                class: "icon"
              }, null, 8, ["svg"])
            ], 8, _hoisted_1$H);
          };
        }
      });
      const _hoisted_1$G = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$l(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$G, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M110-520q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32Q97.25-580 110-580h148L79-759q-9-9.07-9-21.53Q70-793 79.05-802q9.06-9 21.5-9 12.45 0 21.45 9l178 179v-147q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v220q0 12.75-8.62 21.37Q342.75-520 330-520zm30 360q-24 0-42-18t-18-42v-200q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v200h310q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5zm709.82-280q-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-270H460q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h360q24 0 42 18t18 42v270q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63M570-160q-12.75 0-21.37-8.63Q540-177.25 540-190v-160q0-12.75 8.63-21.38Q557.25-380 570-380h280q12.75 0 21.38 8.62Q880-362.75 880-350v160q0 12.75-8.62 21.37Q862.75-160 850-160z" }, null, -1)
        ]));
      }
      const Pip = { render: render$l };
      const _hoisted_1$F = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$k(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$F, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M140-160q-24 0-42-18t-18-42v-270q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v270h680v-520H470q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h350q24 0 42 18t18 42v520q0 24-18 42t-42 18zm407-290 129 129q9 9 21 9t21-9.05q9-9.06 9-21.5 0-12.45-9-21.45L589-493h88q12.75 0 21.38-8.68 8.62-8.67 8.62-21.5 0-12.82-8.62-21.32-8.63-8.5-21.38-8.5H517q-12.75 0-21.37 8.62Q487-535.75 487-523v160q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63 8.5-8.62 8.5-21.37zM110-580q-12.75 0-21.37-8.63Q80-597.25 80-610v-160q0-12.75 8.63-21.38Q97.25-800 110-800h240q12.75 0 21.38 8.62Q380-782.75 380-770v160q0 12.75-8.62 21.37Q362.75-580 350-580zm370 100" }, null, -1)
        ]));
      }
      const PipExit = { render: render$k };
      const _hoisted_1$E = ["title"];
      const _sfc_main$p = /* @__PURE__ */ defineComponent({
        __name: "PipButton",
        setup(__props) {
          const { pictureInPicture } = usePlayerContext();
          return (_ctx, _cache) => {
            return unref(pictureInPicture).isSupport ? (openBlock(), createElementBlock("button", {
              key: 0,
              title: unref(pictureInPicture).isPip.value ? "退出画中画(P)" : "画中画(P)",
              onClick: _cache[0] || (_cache[0] = //@ts-ignore
              (...args) => unref(pictureInPicture).toggle && unref(pictureInPicture).toggle(...args))
            }, [
              createVNode(Icon, {
                svg: unref(pictureInPicture).isPip.value ? unref(PipExit) : unref(Pip),
                class: "icon"
              }, null, 8, ["svg"])
            ], 8, _hoisted_1$E)) : createCommentVNode("", true);
          };
        }
      });
      const _hoisted_1$D = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$j(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$D, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M585-200q-24.75 0-42.37-17.63Q525-235.25 525-260v-440q0-24.75 17.63-42.38Q560.25-760 585-760h115q24.75 0 42.38 17.62Q760-724.75 760-700v440q0 24.75-17.62 42.37Q724.75-200 700-200zm-325 0q-24.75 0-42.37-17.63Q200-235.25 200-260v-440q0-24.75 17.63-42.38Q235.25-760 260-760h115q24.75 0 42.38 17.62Q435-724.75 435-700v440q0 24.75-17.62 42.37Q399.75-200 375-200zm325-60h115v-440H585zm-325 0h115v-440H260zm0-440v440zm325 0v440z" }, null, -1)
        ]));
      }
      const Pause = { render: render$j };
      const _hoisted_1$C = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$i(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$C, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M320-258v-450q0-14 9.07-22 9.06-8 21.15-8 3.78 0 7.91 1 4.12 1 7.87 3l354 226q7 5 10.5 11t3.5 14-3.5 14-10.5 11L366-232q-3.78 2-7.95 3-4.16 1-7.94 1-12.11 0-21.11-8t-9-22m60-54 269-171-269-171z" }, null, -1)
        ]));
      }
      const Play = { render: render$i };
      const _hoisted_1$B = ["title"];
      const _sfc_main$o = /* @__PURE__ */ defineComponent({
        __name: "PlayButton",
        setup(__props) {
          const { playing } = usePlayerContext();
          const icon2 = computed(() => {
            return playing.isPlaying.value ? Pause : Play;
          });
          return (_ctx, _cache) => {
            return openBlock(), createElementBlock("button", {
              onClick: _cache[0] || (_cache[0] = //@ts-ignore
              (...args) => unref(playing).togglePlay && unref(playing).togglePlay(...args)),
              title: unref(playing).isPlaying.value ? "暂停(Space)" : "播放(Space)"
            }, [
              createVNode(Icon, {
                svg: icon2.value,
                class: "icon"
              }, null, 8, ["svg"])
            ], 8, _hoisted_1$B);
          };
        }
      });
      const PlayButton = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-4cc56796"]]);
      const PortalSymbol = Symbol("XPlayerPortal");
      function usePortalProvider() {
        const container = ref(null);
        const context = {
          container
        };
        provide(PortalSymbol, context);
        return context;
      }
      function usePortal() {
        const context = inject(PortalSymbol);
        if (!context) {
          throw new Error("usePortal must be used within a XPlayer component");
        }
        return context;
      }
      const _sfc_main$n = /* @__PURE__ */ defineComponent({
        __name: "index",
        props: {
          visible: { type: Boolean },
          x: { default: 0 },
          y: { default: 0 },
          triggerRef: {},
          placement: {},
          offset: {},
          lockControls: { type: Boolean, default: true }
        },
        emits: ["click", "mouseenter", "mouseleave"],
        setup(__props, { emit: __emit }) {
          const props = __props;
          const emit = __emit;
          const { container } = usePortal();
          const { controls, refs } = usePlayerContext();
          const visibleModel = useVModel(props, "visible", emit);
          const portalContainer = computed(() => container.value || "body");
          const popupRef = shallowRef();
          const forceUpdate = shallowRef(0);
          const position = computed(() => {
            if (props.x && props.y) {
              return {
                x: props.x,
                y: props.y
              };
            }
            return triggerPositiong.value;
          });
          const style = computed(() => ({
            left: `${position.value.x}px`,
            top: `${position.value.y}px`,
            position: container.value ? "absolute" : "fixed"
          }));
          const triggerPositiong = computed(() => {
            forceUpdate.value;
            if (!props.triggerRef || !popupRef.value) return { x: 0, y: 0 };
            const triggerRect = props.triggerRef.getBoundingClientRect();
            const menuRect = popupRef.value.getBoundingClientRect();
            const playerContainer = props.triggerRef.closest(".x-player");
            if (!playerContainer) return { x: 0, y: 0 };
            const playerRect = playerContainer.getBoundingClientRect();
            const triggerLeft = triggerRect.left - playerRect.left;
            const triggerWidth = triggerRect.width;
            const triggerTop = triggerRect.top - playerRect.top;
            const triggerBottom = triggerRect.bottom - playerRect.top;
            const spaceBelow = playerRect.height - triggerBottom;
            const spaceAbove = triggerTop;
            const offset = props.offset ?? 8;
            let y;
            if (props.placement === "top" || props.placement !== "bottom" && spaceBelow < menuRect.height && spaceAbove >= menuRect.height) {
              y = triggerTop - menuRect.height - offset;
            } else {
              y = triggerBottom + offset;
            }
            let x = triggerLeft + triggerWidth / 2 - menuRect.width / 2;
            x = Math.max(16, x);
            x = Math.min(x, playerRect.width - menuRect.width - 16);
            return { x, y };
          });
          watch(visibleModel, (visible) => {
            if (visible) {
              setTimeout(() => {
                forceUpdate.value++;
              }, 0);
            }
            if (props.lockControls) {
              controls.setIsMouseInPopup(visible);
            }
          });
          onClickOutside(popupRef, (event) => {
            var _a, _b;
            if (visibleModel.value) {
              if ((_a = props.triggerRef) == null ? undefined : _a.contains(event.target)) {
                event.stopPropagation();
              }
              if ((_b = refs.videoMaskRef.value) == null ? undefined : _b.contains(event.target)) {
                event.stopPropagation();
              }
              visibleModel.value = false;
            }
          });
          return (_ctx, _cache) => {
            return openBlock(), createBlock(Teleport, {
              to: portalContainer.value,
              disabled: !portalContainer.value
            }, [
              withDirectives(createElementVNode("div", mergeProps({
                ref_key: "popupRef",
                ref: popupRef,
                class: _ctx.$style["x-popup"],
                style: style.value
              }, _ctx.$attrs), [
                createElementVNode("div", {
                  class: normalizeClass(_ctx.$style["x-popup-bg"])
                }, null, 2),
                createElementVNode("div", {
                  class: normalizeClass(_ctx.$style["x-popup-content"])
                }, [
                  renderSlot(_ctx.$slots, "default")
                ], 2)
              ], 16), [
                [vShow, unref(visibleModel)]
              ])
            ], 8, ["to", "disabled"]);
          };
        }
      });
      const style0$5 = {
        "x-popup": "_x-popup_10v9c_2",
        "x-popup-bg": "_x-popup-bg_10v9c_14",
        "x-popup-content": "_x-popup-content_10v9c_23"
      };
      const cssModules$5 = {
        "$style": style0$5
      };
      const Popup = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__cssModules", cssModules$5]]);
      const _sfc_main$m = /* @__PURE__ */ defineComponent({
        __name: "index",
        props: {
          visible: { type: Boolean },
          x: {},
          y: {},
          triggerRef: {},
          placement: {},
          offset: {}
        },
        emits: ["update:visible"],
        setup(__props, { emit: __emit }) {
          const props = __props;
          const emit = __emit;
          const visibleModel = useVModel(props, "visible", emit);
          return (_ctx, _cache) => {
            return openBlock(), createBlock(Popup, {
              class: normalizeClass(_ctx.$style["x-menu-popup"]),
              visible: unref(visibleModel),
              "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => isRef(visibleModel) ? visibleModel.value = $event : null),
              x: props.x,
              y: props.y,
              triggerRef: _ctx.triggerRef,
              placement: props.placement,
              offset: props.offset
            }, {
              default: withCtx(() => [
                createElementVNode("div", {
                  class: normalizeClass(_ctx.$style["x-menu-content"]),
                  ref: "menuRef"
                }, [
                  renderSlot(_ctx.$slots, "default", {}, undefined, true)
                ], 2)
              ]),
              _: 3
            }, 8, ["class", "visible", "x", "y", "triggerRef", "placement", "offset"]);
          };
        }
      });
      const style0$4 = {
        "x-menu-popup": "_x-menu-popup_1yhl2_2",
        "x-menu-content": "_x-menu-content_1yhl2_6"
      };
      const cssModules$4 = {
        "$style": style0$4
      };
      const Menu = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__cssModules", cssModules$4], ["__scopeId", "data-v-fa8568f8"]]);
      const _hoisted_1$A = { class: "playback-rate-button" };
      const _hoisted_2$c = { class: "menu-items" };
      const _hoisted_3$b = ["onClick"];
      const _sfc_main$l = /* @__PURE__ */ defineComponent({
        __name: "PlaybackRateButton",
        setup(__props) {
          const { playbackRate } = usePlayerContext();
          const rateOptions = computed(
            () => [...playbackRate.rateOptions.value].reverse()
          );
          const menuVisible = shallowRef(false);
          const buttonRef = ref();
          const toggleSpeedMenu = () => {
            menuVisible.value = !menuVisible.value;
          };
          const handleSpeedChange = (rate) => {
            playbackRate.set(rate);
            menuVisible.value = false;
          };
          return (_ctx, _cache) => {
            return openBlock(), createElementBlock("div", _hoisted_1$A, [
              createElementVNode("button", {
                ref_key: "buttonRef",
                ref: buttonRef,
                class: "control-button",
                title: "倍速 (↑/↓)",
                onClick: toggleSpeedMenu
              }, toDisplayString(unref(playbackRate).current.value) + " X ", 513),
              createVNode(Menu, {
                visible: menuVisible.value,
                "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => menuVisible.value = $event),
                class: "menu",
                triggerRef: buttonRef.value,
                placement: "top"
              }, {
                default: withCtx(() => [
                  createElementVNode("div", _hoisted_2$c, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(rateOptions.value, (rate) => {
                      return openBlock(), createElementBlock("div", {
                        key: rate,
                        class: normalizeClass(["menu-item", { active: unref(playbackRate).current.value === rate }]),
                        onClick: ($event) => handleSpeedChange(rate)
                      }, toDisplayString(rate), 11, _hoisted_3$b);
                    }), 128))
                  ])
                ]),
                _: 1
              }, 8, ["visible", "triggerRef"])
            ]);
          };
        }
      });
      const PlaybackRateButton = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-85f2a85a"]]);
      const fillZero = (value) => {
        return value.toString().padStart(2, "0");
      };
      const formatTime = (seconds) => {
        if (Number.isNaN(seconds)) {
          return "--:--";
        }
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor(seconds % 3600 / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${hours > 0 ? `${fillZero(hours)}:` : ""}${fillZero(minutes)}:${fillZero(remainingSeconds)}`;
      };
      const _sfc_main$k = {};
      const _hoisted_1$z = { class: "loading-container" };
      function _sfc_render(_ctx, _cache) {
        return openBlock(), createElementBlock("div", _hoisted_1$z, _cache[0] || (_cache[0] = [
          createStaticVNode('<div class="loading-backdrop" data-v-54976e1d></div><div class="loading-effect" data-v-54976e1d><div class="loader" data-v-54976e1d><div class="loader-ring outer" data-v-54976e1d></div><div class="loader-ring inner" data-v-54976e1d></div></div></div>', 2)
        ]));
      }
      const Loading$1 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render], ["__scopeId", "data-v-54976e1d"]]);
      const _hoisted_1$y = { class: "thumbnail-container" };
      const _hoisted_2$b = ["width", "height"];
      const _hoisted_3$a = { class: "thumbnail-loading" };
      const _hoisted_4$7 = { class: "time-tooltip" };
      const DEFAULT_WIDTH = 320;
      const DEFAULT_HEIGHT = 180;
      const _sfc_main$j = /* @__PURE__ */ defineComponent({
        __name: "index",
        props: {
          visible: { type: Boolean },
          position: {},
          time: {},
          progressBarWidth: {}
        },
        setup(__props) {
          const props = __props;
          const { rootProps, source } = usePlayerContext();
          const { onThumbnailRequest } = rootProps;
          const thumbnailCanvas = shallowRef(null);
          const width = shallowRef(DEFAULT_WIDTH);
          const height = shallowRef(DEFAULT_HEIGHT);
          const lastTimer = shallowRef(null);
          const thumb = reactive({
            lastHoverTime: -1,
            lastRequestTime: -1,
            renderTime: -1,
            renderImage: null
          });
          const ctx = computed(() => {
            var _a;
            return (_a = thumbnailCanvas.value) == null ? undefined : _a.getContext("2d");
          });
          const loading = computed(
            () => thumb.lastRequestTime >= 0 && thumb.lastRequestTime === thumb.lastHoverTime
          );
          const previewTransform = computed(() => {
            if (!thumbnailCanvas.value) return -(width.value / 2);
            const thumbnailWidth = width.value;
            const centerOffset = props.progressBarWidth * (props.position / 100);
            if (centerOffset < thumbnailWidth / 2) {
              return -centerOffset;
            }
            if (centerOffset > props.progressBarWidth - thumbnailWidth / 2) {
              return -(thumbnailWidth - (props.progressBarWidth - centerOffset));
            }
            return -(thumbnailWidth / 2);
          });
          const updateThumbnail = async (hoverTime, isLast) => {
            if (lastTimer.value) {
              clearTimeout(lastTimer.value);
              lastTimer.value = null;
            }
            thumb.renderImage = null;
            if (!isLast) {
              lastTimer.value = setTimeout(() => {
                if (hoverTime === thumb.lastHoverTime) {
                  updateThumbnail(hoverTime, true);
                }
              }, 300);
            }
            const cacheImage = await onThumbnailRequest({
              type: "Cache",
              time: hoverTime,
              isLast
            });
            if (cacheImage) {
              thumb.renderImage = cacheImage;
              thumb.renderTime = hoverTime;
              if (isLast) {
                thumb.lastRequestTime = -1;
              }
              return;
            }
            thumb.lastRequestTime = hoverTime;
            const newImage = await onThumbnailRequest({
              type: "Must",
              time: hoverTime,
              isLast
            });
            if (!newImage) return;
            if (hoverTime === thumb.lastHoverTime && isLast) {
              thumb.lastRequestTime = -1;
              thumb.renderImage = newImage;
              thumb.renderTime = hoverTime;
            }
          };
          watch(
            () => [props.visible, props.time],
            async () => {
              if (!onThumbnailRequest) return;
              if (!props.visible || !props.time) {
                thumb.lastHoverTime = -1;
                thumb.renderImage = null;
                return;
              }
              const hoverTime = props.time;
              thumb.lastHoverTime = hoverTime;
              await updateThumbnail(hoverTime, false);
            }
          );
          watch(
            () => thumb.renderImage,
            (newVal, oldVal) => {
              if (thumbnailCanvas.value && ctx.value) {
                width.value = (newVal == null ? undefined : newVal.width) ?? (oldVal == null ? undefined : oldVal.width) ?? DEFAULT_WIDTH;
                height.value = (newVal == null ? undefined : newVal.height) ?? (oldVal == null ? undefined : oldVal.height) ?? DEFAULT_HEIGHT;
                requestAnimationFrame(() => {
                  ctx.value.fillRect(0, 0, width.value, height.value);
                  if (newVal && thumb.renderTime === thumb.lastHoverTime) {
                    ctx.value.drawImage(newVal, 0, 0, width.value, height.value);
                  }
                });
              }
            }
          );
          watch([source.list], () => {
            thumb.lastHoverTime = -1;
            thumb.lastRequestTime = -1;
            thumb.renderTime = -1;
            thumb.renderImage = null;
            if (lastTimer.value) {
              clearTimeout(lastTimer.value);
              lastTimer.value = null;
            }
          });
          onUnmounted(() => {
            if (lastTimer.value) {
              clearTimeout(lastTimer.value);
              lastTimer.value = null;
            }
          });
          return (_ctx, _cache) => {
            return withDirectives((openBlock(), createElementBlock("div", {
              class: "preview-container",
              style: normalizeStyle({
                left: `${_ctx.position}%`,
                transform: `translateX(${previewTransform.value}px)`
              })
            }, [
              createElementVNode("div", _hoisted_1$y, [
                createElementVNode("canvas", {
                  ref_key: "thumbnailCanvas",
                  ref: thumbnailCanvas,
                  width: width.value,
                  height: height.value
                }, null, 8, _hoisted_2$b),
                withDirectives(createElementVNode("div", _hoisted_3$a, [
                  createVNode(Loading$1)
                ], 512), [
                  [vShow, loading.value]
                ])
              ]),
              createElementVNode("div", _hoisted_4$7, toDisplayString(unref(formatTime)(_ctx.time)), 1)
            ], 4)), [
              [vShow, _ctx.visible]
            ]);
          };
        }
      });
      const Thumbnail = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-8ae7b92c"]]);
      const _hoisted_1$x = { class: "progress-bar" };
      const _hoisted_2$a = { class: "progress-bar-container" };
      const _sfc_main$i = /* @__PURE__ */ defineComponent({
        __name: "ProgressBar",
        setup(__props) {
          const { progress, progressBar } = usePlayerContext();
          const progressBarWrapperRef = shallowRef(null);
          const { width: progressBarWidth } = useElementSize(progressBarWrapperRef);
          const isDragging = progressBar.isDragging;
          const isInProgressBar = shallowRef(false);
          const dragProgress = shallowRef(0);
          const originalProgress = shallowRef(0);
          const previewTime = shallowRef(0);
          const previewProgress = shallowRef(0);
          const isPreviewVisible = shallowRef(false);
          const calculatePosition = (event, element) => {
            const rect = element.getBoundingClientRect();
            const position = (event.clientX - rect.left) / rect.width;
            return Math.min(Math.max(position, 0), 1);
          };
          const handleBarWrapperClick = (event) => {
            if (!progressBarWrapperRef.value || isDragging.value) return;
            const position = calculatePosition(event, progressBarWrapperRef.value);
            const newTime = position * progress.duration.value;
            progress.seekTo(newTime);
          };
          const handleBarWrapperMouseDown = (event) => {
            if (!progressBarWrapperRef.value) return;
            const position = calculatePosition(event, progressBarWrapperRef.value);
            startDragging(position);
          };
          const handleBarWrapperMouseEnter = () => {
            isInProgressBar.value = true;
            if (!isPreviewVisible.value) {
              showPreview();
            }
          };
          const handleBarWrapperMouseMove = (event) => {
            if (!progressBarWrapperRef.value) return;
            const position = calculatePosition(event, progressBarWrapperRef.value);
            updatePreview(position);
          };
          const handleBarWrapperMouseLeave = () => {
            isInProgressBar.value = false;
            hidePreview();
          };
          const handleGlobalMouseMove = (event) => {
            if (!progressBarWrapperRef.value) return;
            const position = calculatePosition(event, progressBarWrapperRef.value);
            updateDragging(position);
          };
          const handleGlobalMouseUp = (event) => {
            document.removeEventListener("mousemove", handleGlobalMouseMove);
            document.removeEventListener("mouseup", handleGlobalMouseUp);
            const position = calculatePosition(event, progressBarWrapperRef.value);
            stopDragging(position);
            if (!isInProgressBar.value) {
              hidePreview();
            }
          };
          const updatePreview = (position) => {
            previewProgress.value = position * 100;
            previewTime.value = position * progress.duration.value;
          };
          const startDragging = (position) => {
            isDragging.value = true;
            originalProgress.value = progress.progress.value;
            dragProgress.value = position * 100;
            previewTime.value = position * progress.duration.value;
            document.addEventListener("mousemove", handleGlobalMouseMove);
            document.addEventListener("mouseup", handleGlobalMouseUp);
          };
          const updateDragging = (position) => {
            if (!isDragging.value) return;
            dragProgress.value = position * 100;
            previewTime.value = position * progress.duration.value;
          };
          const stopDragging = (position) => {
            if (isDragging.value) {
              const finalTime = position * progress.duration.value;
              progress.seekTo(finalTime);
              previewProgress.value = position * 100;
              previewTime.value = finalTime;
            }
            isDragging.value = false;
          };
          const showPreview = () => {
            isPreviewVisible.value = true;
          };
          const hidePreview = () => {
            if (!isDragging.value) {
              isPreviewVisible.value = false;
              previewProgress.value = 0;
              previewTime.value = 0;
            }
          };
          onUnmounted(() => {
            document.removeEventListener("mousemove", handleGlobalMouseMove);
            document.removeEventListener("mouseup", handleGlobalMouseUp);
          });
          return (_ctx, _cache) => {
            return openBlock(), createElementBlock("div", _hoisted_1$x, [
              createElementVNode("div", {
                ref_key: "progressBarWrapperRef",
                ref: progressBarWrapperRef,
                class: "progress-bar-wrapper",
                onClick: handleBarWrapperClick,
                onMousedown: handleBarWrapperMouseDown,
                onMouseenter: handleBarWrapperMouseEnter,
                onMousemove: handleBarWrapperMouseMove,
                onMouseleave: handleBarWrapperMouseLeave
              }, [
                createElementVNode("div", _hoisted_2$a, [
                  createElementVNode("div", {
                    class: "progress-buffer",
                    style: normalizeStyle({ width: `${unref(progress).buffered.value}%` })
                  }, null, 4),
                  createElementVNode("div", {
                    class: "progress-current",
                    style: normalizeStyle({
                      width: `${unref(progress).progress.value}%`,
                      opacity: unref(isDragging) ? 0.5 : 1
                    })
                  }, null, 4),
                  unref(isDragging) ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "progress-current progress-dragging",
                    style: normalizeStyle({ width: `${dragProgress.value}%` })
                  }, null, 4)) : createCommentVNode("", true),
                  withDirectives(createElementVNode("div", {
                    class: "progress-hover",
                    style: normalizeStyle({ width: `${previewProgress.value}%` })
                  }, null, 4), [
                    [vShow, isPreviewVisible.value && !unref(isDragging)]
                  ]),
                  unref(isDragging) ? (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: "progress-handle-container",
                    style: normalizeStyle({ left: `${originalProgress.value}%` })
                  }, _cache[0] || (_cache[0] = [
                    createElementVNode("div", { class: "progress-handle progress-handle-original" }, null, -1)
                  ]), 4)) : createCommentVNode("", true),
                  createElementVNode("div", {
                    class: "progress-handle-container",
                    style: normalizeStyle({
                      left: `${unref(isDragging) ? dragProgress.value : unref(progress).progress.value}%`
                    })
                  }, [
                    createElementVNode("div", {
                      class: normalizeClass(["progress-handle", { "is-dragging": unref(isDragging) }])
                    }, null, 2)
                  ], 4)
                ]),
                createVNode(Thumbnail, {
                  visible: isPreviewVisible.value || unref(isDragging),
                  position: unref(isDragging) ? dragProgress.value : previewProgress.value,
                  time: unref(isDragging) ? previewTime.value : isPreviewVisible.value ? previewTime.value : unref(progress).currentTime.value,
                  "progress-bar-width": unref(progressBarWidth)
                }, null, 8, ["visible", "position", "time", "progress-bar-width"])
              ], 544)
            ]);
          };
        }
      });
      const ProgressBar = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-08b7c1c7"]]);
      const _hoisted_1$w = ["onClick"];
      const _sfc_main$h = /* @__PURE__ */ defineComponent({
        __name: "QualityButton",
        setup(__props) {
          const { source, subtitles } = usePlayerContext();
          const menuVisible = shallowRef(false);
          const buttonRef = shallowRef();
          const currentQuality = computed(() => {
            if (!source.current.value) return "自动";
            const quality = source.current.value.displayQuality || source.current.value.quality;
            return typeof quality === "number" ? `${quality}P` : quality;
          });
          const toggleMenu = () => {
            menuVisible.value = !menuVisible.value;
          };
          const getDisplayQuality = (sourceValue) => {
            const quality = sourceValue.displayQuality || sourceValue.quality;
            return typeof quality === "number" ? `${quality}P` : quality;
          };
          const handleQualityChange = async (sourceValue) => {
            menuVisible.value = false;
            await source.changeQuality(sourceValue);
          };
          return (_ctx, _cache) => {
            return openBlock(), createElementBlock("button", {
              ref_key: "buttonRef",
              ref: buttonRef,
              class: "quality-button",
              title: "画质",
              onClick: toggleMenu
            }, [
              createElementVNode("span", null, toDisplayString(currentQuality.value), 1),
              createVNode(Menu, {
                visible: menuVisible.value,
                "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => menuVisible.value = $event),
                triggerRef: buttonRef.value,
                placement: "top"
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(source).list.value, (item) => {
                    var _a;
                    return openBlock(), createElementBlock("div", {
                      key: item.quality,
                      class: normalizeClass(["menu-item", { active: item.quality === ((_a = unref(source).current) == null ? undefined : _a.value.quality) }]),
                      onClick: ($event) => handleQualityChange(item)
                    }, toDisplayString(getDisplayQuality(item)), 11, _hoisted_1$w);
                  }), 128))
                ]),
                _: 1
              }, 8, ["visible", "triggerRef"])
            ], 512);
          };
        }
      });
      const QualityButton = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-68d7f6dd"]]);
      const _sfc_main$g = /* @__PURE__ */ defineComponent({
        __name: "ScrollTip",
        setup(__props) {
          const { fullscreen } = usePlayerContext();
          const isVisible = shallowRef(false);
          const timer = shallowRef(null);
          watch(
            () => fullscreen.isFullscreen.value,
            (newVal) => {
              if (newVal) {
                isVisible.value = true;
                timer.value = window.setTimeout(() => {
                  isVisible.value = false;
                }, 2e3);
              } else {
                isVisible.value = false;
                if (timer.value) {
                  window.clearTimeout(timer.value);
                  timer.value = null;
                }
              }
            }
          );
          onUnmounted(() => {
            if (timer.value) {
              window.clearTimeout(timer.value);
              timer.value = null;
            }
          });
          return (_ctx, _cache) => {
            return openBlock(), createElementBlock("div", {
              class: normalizeClass(["scroll-tip", { "show": isVisible.value }])
            }, _cache[0] || (_cache[0] = [
              createElementVNode("div", { class: "scroll-tip-content" }, [
                createElementVNode("span", null, "往下滚动有惊喜"),
                createElementVNode("span", { class: "icon" }, "👇")
              ], -1)
            ]), 2);
          };
        }
      });
      const ScrollTip = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-c024fd1d"]]);
      const _hoisted_1$v = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$h(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$v, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M212-260q-90 0-151-65.5T0-482q0-90 61.5-154T212-700q36 0 69.5 12t59.5 37l93 90-42 42-89-87q-18-18-41.5-26t-49.5-8q-64 0-108 46.5T60-482q0 66 43.5 114T212-320q25 0 48.5-8t42.5-25l316-298q26-25 59.5-37t68.5-12q90 0 151.5 64T960-482q0 91-61.5 156.5T747-260q-35 0-69-11.5T619-308l-91-90 42-42 87 87q17 17 41 25t49 8q65 0 109-48t44-114q0-65-44.5-111.5T747-640q-25 0-48.5 9T657-605L341-307q-26 24-60 35.5T212-260" }, null, -1)
        ]));
      }
      const AllInclusiveSvg = { render: render$h };
      const _hoisted_1$u = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$g(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$u, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M220-478q0 20 2.5 39t7.5 36q3 12-1.5 24T213-362t-22.5 0-15.5-16q-8-25-11.5-49.5T160-478q0-131 94.5-225.5T480-798h43l-61-61q-8-8-8-19t8-19 19.5-8 19.5 8l109 108q9 9 9 21t-9 21L502-639q-8 8-20 8t-20-8-8-20 8-20l59-59h-41q-107 0-183.5 76.5T220-478m520-1q0-20-2.5-39t-7.5-37q-4-12 .5-24t15.5-17 22 0 15 16q9 25 13 50t4 51q0 131-94.5 225.5T480-159h-45l61 61q8 8 8 19t-8 19-19.5 8-19.5-8L348-168q-9-9-9-21t9-21l109-109q8-8 19.5-8t19.5 8 8 19.5-8 19.5l-61 61h45q107 0 183.5-76.5T740-479" }, null, -1)
        ]));
      }
      const AutorenewSvg = { render: render$g };
      const _hoisted_1$t = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$f(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$t, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M480-80q-83 0-156-31.5T197-197t-85.5-127T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480t-31.5 156T763-197t-127 85.5T480-80m0-60q61.01 0 117.51-20.5Q654-181 699-220L220-699q-38 46-59 102.17T140-480q0 142.37 98.81 241.19Q337.63-140 480-140m259-121q37-45 59-101.49 22-56.5 22-117.51 0-142.38-98.81-241.19T480-820q-60.66 0-116.83 21T261-739z" }, null, -1)
        ]));
      }
      const BlockSvg = { render: render$f };
      const _hoisted_1$s = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$e(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$s, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M644.82-780q-12.82 0-21.32-8.68-8.5-8.67-8.5-21.5 0-12.82 8.68-21.32 8.67-8.5 21.5-8.5 12.82 0 21.32 8.68 8.5 8.67 8.5 21.5 0 12.82-8.68 21.32-8.67 8.5-21.5 8.5m165 0q-12.82 0-21.32-8.68-8.5-8.67-8.5-21.5 0-12.82 8.68-21.32 8.67-8.5 21.5-8.5 12.82 0 21.32 8.68 8.5 8.67 8.5 21.5 0 12.82-8.68 21.32-8.67 8.5-21.5 8.5m0 165q-12.82 0-21.32-8.68-8.5-8.67-8.5-21.5 0-12.82 8.68-21.32 8.67-8.5 21.5-8.5 12.82 0 21.32 8.68 8.5 8.67 8.5 21.5 0 12.82-8.68 21.32-8.67 8.5-21.5 8.5m0 165q-12.82 0-21.32-8.68-8.5-8.67-8.5-21.5 0-12.82 8.68-21.32 8.67-8.5 21.5-8.5 12.82 0 21.32 8.68 8.5 8.67 8.5 21.5 0 12.82-8.68 21.32-8.67 8.5-21.5 8.5m0 165q-12.82 0-21.32-8.68-8.5-8.67-8.5-21.5 0-12.82 8.68-21.32 8.67-8.5 21.5-8.5 12.82 0 21.32 8.68 8.5 8.67 8.5 21.5 0 12.82-8.68 21.32-8.67 8.5-21.5 8.5m-165 165q-12.82 0-21.32-8.68-8.5-8.67-8.5-21.5 0-12.82 8.68-21.32 8.67-8.5 21.5-8.5 12.82 0 21.32 8.68 8.5 8.67 8.5 21.5 0 12.82-8.68 21.32-8.67 8.5-21.5 8.5m165 0q-12.82 0-21.32-8.68-8.5-8.67-8.5-21.5 0-12.82 8.68-21.32 8.67-8.5 21.5-8.5 12.82 0 21.32 8.68 8.5 8.67 8.5 21.5 0 12.82-8.68 21.32-8.67 8.5-21.5 8.5M180-120q-24.75 0-42.37-17.63Q120-155.25 120-180v-600q0-24.75 17.63-42.38Q155.25-840 180-840h139q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H180v600h139q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5zm272 50v-820q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v820q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63Q452-57.25 452-70" }, null, -1)
        ]));
      }
      const FlipSvg = { render: render$e };
      const _hoisted_1$r = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$d(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$r, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M156-488q-15 0-24-11t-6-25q7-32 18-60.5t27-54.5q8-13 22-14.5t25 9.5q8 8 9 19t-4 20q-14 23-23.5 46T185-512q-2 10-10.5 17t-18.5 7m278 372q0 15-11 24t-25 6q-29-7-57.5-18T285-132q-13-8-14.5-22t9.5-25q8-8 18.5-8.5T318-183q23 14 46 23.5t46 14.5q10 2 17 10.5t7 18.5M218-242q-11 11-24.5 9.5T172-247q-15-26-26-55t-19-61q-3-14 5.5-24.5T156-398q11 0 19 7t10 17q5 24 14 47t23 46q5 9 4 20.5t-8 18.5M559-86q-14 3-25-6t-11-24q0-11 7-19.5t17-10.5q101-26 166-106.5T778-443q0-127-86.5-213.5T478-743h-20l57 57q9 9 9 22t-9 22-22 9-22-9L361-752q-5-5-7-10t-2-11 2-11 7-10l110-110q9-9 22-9t22 9 9 22-9 22l-57 57h20q151 0 255.5 104.5T838-443q0 131-78 230T559-86" }, null, -1)
        ]));
      }
      const RotateLeftSvg = { render: render$d };
      const _hoisted_1$q = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$c(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$q, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M804-488q-10 0-18.5-7T775-512q-5-24-14.5-47T737-605q-5-9-4-20t9-19q11-11 25-9.5t22 14.5q16 26 27 54.5t18 60.5q3 14-6 25t-24 11M526-116q0-10 7-18.5t17-10.5q23-5 46-14.5t46-23.5q9-5 19.5-4.5T680-179q11 11 9.5 25T675-132q-27 17-55.5 28T562-86q-14 3-25-6t-11-24m216-126q-7-7-8-18.5t4-20.5q14-23 23-46t14-47q2-10 10-17t19-7q15 0 23.5 10.5T833-363q-8 32-19 61t-26 55q-8 13-21.5 14.5T742-242M401-86q-123-28-201-127t-78-230q0-151 104.5-255.5T482-803h20l-57-57q-9-9-9-22t9-22 22-9 22 9l110 110q5 5 7 10t2 11-2 11-7 10L489-642q-9 9-22 9t-22-9-9-22 9-22l57-57h-20q-127 0-213.5 86.5T182-443q0 110 65 190.5T413-146q10 2 17 10.5t7 19.5q0 15-11 24t-25 6" }, null, -1)
        ]));
      }
      const RotateSvg = { render: render$c };
      const _hoisted_1$p = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$b(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$p, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M421-80q-14 0-25-9t-13-23l-15-94q-19-7-40-19t-37-25l-86 40q-14 6-28 1.5T155-226L97-330q-8-13-4.5-27t15.5-23l80-59q-2-9-2.5-20.5T185-480t.5-20.5T188-521l-80-59q-12-9-15.5-23t4.5-27l58-104q8-13 22-17.5t28 1.5l86 40q16-13 37-25t40-18l15-95q2-14 13-23t25-9h118q14 0 25 9t13 23l15 94q19 7 40.5 18.5T669-710l86-40q14-6 27.5-1.5T804-734l59 104q8 13 4.5 27.5T852-580l-80 57q2 10 2.5 21.5t.5 21.5-.5 21-2.5 21l80 58q12 8 15.5 22.5T863-330l-58 104q-8 13-22 17.5t-28-1.5l-86-40q-16 13-36.5 25.5T592-206l-15 94q-2 14-13 23t-25 9zm15-60h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715-480t-2-33.5-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480t2.5 33.5T254-413l-94 69 40 72 106-46q24 24 53.5 41t62.5 25zm44-210q54 0 92-38t38-92-38-92-92-38-92 38-38 92 38 92 92 38m0-130" }, null, -1)
        ]));
      }
      const SettingsSvg = { render: render$b };
      const _hoisted_1$o = ["disabled"];
      const _hoisted_2$9 = ["disabled"];
      const _hoisted_3$9 = ["disabled"];
      const _sfc_main$f = /* @__PURE__ */ defineComponent({
        __name: "SettingsButton",
        setup(__props) {
          const { transform, thumbnailSettings } = usePlayerContext();
          const buttonRef = shallowRef();
          const menuVisible = shallowRef(false);
          const toggleMenu = () => {
            menuVisible.value = !menuVisible.value;
          };
          return (_ctx, _cache) => {
            return openBlock(), createElementBlock("button", {
              class: normalizeClass(_ctx.$style["settings-button"]),
              ref_key: "buttonRef",
              ref: buttonRef,
              title: "设置",
              onClick: toggleMenu
            }, [
              createVNode(Icon, {
                svg: unref(SettingsSvg),
                class: "icon"
              }, null, 8, ["svg"]),
              createVNode(Popup, {
                class: normalizeClass(_ctx.$style["settings-popup"]),
                visible: menuVisible.value,
                "onUpdate:visible": _cache[7] || (_cache[7] = ($event) => menuVisible.value = $event),
                triggerRef: buttonRef.value,
                placement: "top"
              }, {
                default: withCtx(() => [
                  createElementVNode("div", {
                    class: normalizeClass(_ctx.$style["settings-content"])
                  }, [
                    createElementVNode("div", {
                      class: normalizeClass(_ctx.$style["chunk"])
                    }, [
                      createElementVNode("div", {
                        class: normalizeClass(_ctx.$style["chunk-header"])
                      }, _cache[8] || (_cache[8] = [
                        createElementVNode("span", null, "预览图", -1)
                      ]), 2),
                      createElementVNode("div", {
                        class: normalizeClass(_ctx.$style["chunk-content"])
                      }, [
                        createElementVNode("div", {
                          class: normalizeClass(_ctx.$style["button-group"])
                        }, [
                          createElementVNode("button", {
                            class: normalizeClass([_ctx.$style["option-button"], { [_ctx.$style.active]: unref(thumbnailSettings).autoLoadThumbnails.value }]),
                            onClick: _cache[0] || (_cache[0] = //@ts-ignore
                            (...args) => unref(thumbnailSettings).toggleAutoLoad && unref(thumbnailSettings).toggleAutoLoad(...args))
                          }, [
                            createElementVNode("div", {
                              class: normalizeClass(_ctx.$style["item-icon"])
                            }, [
                              createVNode(Icon, {
                                svg: unref(AutorenewSvg),
                                class: "icon icon-sm"
                              }, null, 8, ["svg"])
                            ], 2),
                            _cache[9] || (_cache[9] = createElementVNode("span", null, "自动缓冲", -1))
                          ], 2),
                          createElementVNode("button", {
                            class: normalizeClass([_ctx.$style["option-button"], {
                              [_ctx.$style.active]: unref(thumbnailSettings).superAutoBuffer.value
                            }]),
                            disabled: !unref(thumbnailSettings).autoLoadThumbnails.value,
                            onClick: _cache[1] || (_cache[1] = //@ts-ignore
                            (...args) => unref(thumbnailSettings).toggleSuperBuffer && unref(thumbnailSettings).toggleSuperBuffer(...args))
                          }, [
                            createElementVNode("div", {
                              class: normalizeClass(_ctx.$style["item-icon"])
                            }, [
                              createVNode(Icon, {
                                svg: unref(AllInclusiveSvg),
                                class: "icon icon-sm"
                              }, null, 8, ["svg"])
                            ], 2),
                            _cache[10] || (_cache[10] = createElementVNode("span", null, "全量缓冲", -1))
                          ], 10, _hoisted_1$o)
                        ], 2),
                        createElementVNode("div", {
                          class: normalizeClass(_ctx.$style["tip-text"])
                        }, "刷新后生效", 2)
                      ], 2)
                    ], 2),
                    createElementVNode("div", {
                      class: normalizeClass(_ctx.$style.divider)
                    }, null, 2),
                    createElementVNode("div", {
                      class: normalizeClass(_ctx.$style["chunk"])
                    }, [
                      createElementVNode("div", {
                        class: normalizeClass(_ctx.$style["chunk-header"])
                      }, [
                        _cache[11] || (_cache[11] = createElementVNode("span", null, "旋转", -1)),
                        createElementVNode("div", {
                          class: normalizeClass(_ctx.$style["angle-display"])
                        }, toDisplayString(unref(transform).rotate.value) + "° ", 3)
                      ], 2),
                      createElementVNode("div", {
                        class: normalizeClass(_ctx.$style["chunk-content"])
                      }, [
                        createElementVNode("div", {
                          class: normalizeClass(_ctx.$style["control-buttons"])
                        }, [
                          createElementVNode("button", {
                            class: normalizeClass(_ctx.$style["control-button"]),
                            disabled: unref(transform).rotate.value === -270,
                            onClick: _cache[2] || (_cache[2] = //@ts-ignore
                            (...args) => unref(transform).left && unref(transform).left(...args))
                          }, [
                            createVNode(Icon, {
                              svg: unref(RotateLeftSvg),
                              class: "icon icon-sm"
                            }, null, 8, ["svg"])
                          ], 10, _hoisted_2$9),
                          createElementVNode("button", {
                            class: normalizeClass(_ctx.$style["control-button"]),
                            onClick: _cache[3] || (_cache[3] = //@ts-ignore
                            (...args) => unref(transform).normal && unref(transform).normal(...args))
                          }, [
                            createVNode(Icon, {
                              svg: unref(BlockSvg),
                              class: "icon icon-sm"
                            }, null, 8, ["svg"])
                          ], 2),
                          createElementVNode("button", {
                            class: normalizeClass(_ctx.$style["control-button"]),
                            disabled: unref(transform).rotate.value === 270,
                            onClick: _cache[4] || (_cache[4] = //@ts-ignore
                            (...args) => unref(transform).right && unref(transform).right(...args))
                          }, [
                            createVNode(Icon, {
                              svg: unref(RotateSvg),
                              class: "icon icon-sm"
                            }, null, 8, ["svg"])
                          ], 10, _hoisted_3$9)
                        ], 2)
                      ], 2)
                    ], 2),
                    createElementVNode("div", {
                      class: normalizeClass(_ctx.$style.divider)
                    }, null, 2),
                    createElementVNode("div", {
                      class: normalizeClass(_ctx.$style["chunk"])
                    }, [
                      createElementVNode("div", {
                        class: normalizeClass(_ctx.$style["chunk-header"])
                      }, [
                        _cache[12] || (_cache[12] = createElementVNode("span", null, "翻转", -1)),
                        createElementVNode("div", {
                          class: normalizeClass(_ctx.$style["flip-status"])
                        }, [
                          unref(transform).flipX.value || unref(transform).flipY.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                            createTextVNode(toDisplayString(unref(transform).flipX.value ? "水平" : "") + " " + toDisplayString(unref(transform).flipY.value ? "垂直" : ""), 1)
                          ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                            createTextVNode("正常")
                          ], 64))
                        ], 2)
                      ], 2),
                      createElementVNode("div", {
                        class: normalizeClass(_ctx.$style["chunk-content"])
                      }, [
                        createElementVNode("div", {
                          class: normalizeClass(_ctx.$style["button-group"])
                        }, [
                          createElementVNode("button", {
                            class: normalizeClass([_ctx.$style["option-button"], { [_ctx.$style.active]: unref(transform).flipX.value }]),
                            onClick: _cache[5] || (_cache[5] = //@ts-ignore
                            (...args) => unref(transform).toggleFlipX && unref(transform).toggleFlipX(...args))
                          }, [
                            createElementVNode("div", {
                              class: normalizeClass(_ctx.$style["item-icon"])
                            }, [
                              createVNode(Icon, {
                                svg: unref(FlipSvg),
                                class: "icon icon-sm",
                                style: { "transform": "rotate(90deg)" }
                              }, null, 8, ["svg"])
                            ], 2),
                            _cache[13] || (_cache[13] = createElementVNode("span", null, "水平", -1))
                          ], 2),
                          createElementVNode("button", {
                            class: normalizeClass([_ctx.$style["option-button"], { [_ctx.$style.active]: unref(transform).flipY.value }]),
                            onClick: _cache[6] || (_cache[6] = //@ts-ignore
                            (...args) => unref(transform).toggleFlipY && unref(transform).toggleFlipY(...args))
                          }, [
                            createElementVNode("div", {
                              class: normalizeClass(_ctx.$style["item-icon"])
                            }, [
                              createVNode(Icon, {
                                svg: unref(FlipSvg),
                                class: "icon icon-sm"
                              }, null, 8, ["svg"])
                            ], 2),
                            _cache[14] || (_cache[14] = createElementVNode("span", null, "垂直", -1))
                          ], 2)
                        ], 2)
                      ], 2)
                    ], 2)
                  ], 2)
                ]),
                _: 1
              }, 8, ["class", "visible", "triggerRef"])
            ], 2);
          };
        }
      });
      const chunk = "_chunk_vrm1f_18";
      const divider = "_divider_vrm1f_49";
      const active = "_active_vrm1f_86";
      const style0$3 = {
        "settings-button": "_settings-button_vrm1f_2",
        "settings-popup": "_settings-popup_vrm1f_7",
        "settings-content": "_settings-content_vrm1f_13",
        chunk,
        "chunk-header": "_chunk-header_vrm1f_24",
        "angle-display": "_angle-display_vrm1f_35",
        "flip-status": "_flip-status_vrm1f_35",
        "chunk-content": "_chunk-content_vrm1f_45",
        divider,
        "button-group": "_button-group_vrm1f_55",
        "tip-text": "_tip-text_vrm1f_61",
        "option-button": "_option-button_vrm1f_68",
        active,
        "item-icon": "_item-icon_vrm1f_103",
        "control-buttons": "_control-buttons_vrm1f_111",
        "control-button": "_control-button_vrm1f_111"
      };
      const cssModules$3 = {
        "$style": style0$3
      };
      const SettingsButton = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__cssModules", cssModules$3]]);
      const _hoisted_1$n = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$a(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$n, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M480-80q-84 0-157-31t-127-85-85-127-31-157 31-157 85-127 127-85 157-31q12 0 21 9t9 21-9 21-21 9q-141 0-240.5 99.5T140-480t99.5 240.5T480-140t240.5-99.5T820-480q0-12 9-21t21-9 21 9 9 21q0 84-31 157t-85 127-127 85-157 31" }, null, -1)
        ]));
      }
      const ProgressActivity = { render: render$a };
      const _hoisted_1$m = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$9(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$m, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18zm0-60h680v-520H140zm0 0v-520zm130-130h300q12.75 0 21.38-8.68 8.62-8.67 8.62-21.5 0-12.82-8.62-21.32-8.63-8.5-21.38-8.5H270q-12.75 0-21.37 8.68-8.63 8.67-8.63 21.5 0 12.82 8.63 21.32 8.62 8.5 21.37 8.5m120-120h300q12.75 0 21.38-8.68 8.62-8.67 8.62-21.5 0-12.82-8.62-21.32-8.63-8.5-21.38-8.5H390q-12.75 0-21.37 8.68-8.63 8.67-8.63 21.5 0 12.82 8.63 21.32 8.62 8.5 21.37 8.5m-119.82 0q12.82 0 21.32-8.68 8.5-8.67 8.5-21.5 0-12.82-8.68-21.32-8.67-8.5-21.5-8.5-12.82 0-21.32 8.68-8.5 8.67-8.5 21.5 0 12.82 8.68 21.32 8.67 8.5 21.5 8.5m420 120q12.82 0 21.32-8.68 8.5-8.67 8.5-21.5 0-12.82-8.68-21.32-8.67-8.5-21.5-8.5-12.82 0-21.32 8.68-8.5 8.67-8.5 21.5 0 12.82 8.68 21.32 8.67 8.5 21.5 8.5" }, null, -1)
        ]));
      }
      const Subtitles = { render: render$9 };
      const _hoisted_1$l = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$8(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$l, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M140-160q-24 0-42-17.63Q80-195.25 80-220v-520q0-24 18-42t42-18h22l60 60h-82v520h519L527-350H270q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h198L62-816q-9-9-9-21t9-21 21-9 21 9l752 753q9 9 9 21t-9 21-21 9-21-9l-97-97zm740-580v502q0 15-9.37 22.5-9.38 7.5-20.63 7.5-14 0-22-8t-8-22v-502H320q-15 0-22.5-9.43t-7.5-20.75q0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h500q23 0 41.5 18.5T880-740M690-470H590q-15 0-22.5-9.32t-7.5-20.5 7.5-20.68T590-530h100q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5m-420.18 0q-12.82 0-21.32-8.68-8.5-8.67-8.5-21.5 0-12.82 8.68-21.32 8.67-8.5 21.5-8.5 12.82 0 21.32 8.68 8.5 8.67 8.5 21.5 0 12.82-8.68 21.32-8.67 8.5-21.5 8.5" }, null, -1)
        ]));
      }
      const SubtitlesOff = { render: render$8 };
      const _hoisted_1$k = { class: "subtitle-button" };
      const _hoisted_2$8 = ["title", "disabled"];
      const _hoisted_3$8 = ["onClick"];
      const _sfc_main$e = /* @__PURE__ */ defineComponent({
        __name: "SubtitleButton",
        setup(__props) {
          const { subtitles } = usePlayerContext();
          const menuVisible = shallowRef(false);
          const buttonRef = shallowRef();
          const toggleMenu = () => {
            menuVisible.value = !menuVisible.value;
          };
          const handleSubtitleSelect = (subtitle) => {
            menuVisible.value = false;
            subtitles.change(subtitle);
          };
          const handleDisableSubtitle = () => {
            menuVisible.value = false;
            subtitles.change(null);
          };
          return (_ctx, _cache) => {
            var _a, _b, _c;
            return openBlock(), createElementBlock("div", _hoisted_1$k, [
              createElementVNode("button", {
                ref_key: "buttonRef",
                ref: buttonRef,
                class: "control-button",
                title: `${((_a = unref(subtitles).list.value) == null ? undefined : _a.length) ? "字幕(C)" : "未找到字幕"}`,
                disabled: unref(subtitles).loading.value || !unref(subtitles).ready.value || ((_b = unref(subtitles).list.value) == null ? undefined : _b.length) === 0,
                onClick: toggleMenu
              }, [
                unref(subtitles).loading.value || !unref(subtitles).ready.value ? (openBlock(), createBlock(Icon, {
                  key: 0,
                  svg: unref(ProgressActivity),
                  class: "loading-icon"
                }, null, 8, ["svg"])) : (openBlock(), createBlock(Icon, {
                  key: 1,
                  svg: unref(subtitles).current.value ? unref(Subtitles) : unref(SubtitlesOff),
                  class: normalizeClass(["subtitle-icon", {
                    "disabled": ((_c = unref(subtitles).list.value) == null ? undefined : _c.length) === 0
                  }])
                }, null, 8, ["svg", "class"]))
              ], 8, _hoisted_2$8),
              createVNode(Menu, {
                visible: menuVisible.value,
                "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => menuVisible.value = $event),
                triggerRef: buttonRef.value,
                placement: "top"
              }, {
                default: withCtx(() => [
                  createElementVNode("div", {
                    class: normalizeClass(["menu-item", { active: unref(subtitles).current.value === null }]),
                    onClick: handleDisableSubtitle
                  }, " 关闭字幕 ", 2),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(subtitles).list.value, (subtitle) => {
                    var _a2;
                    return openBlock(), createElementBlock("div", {
                      key: subtitle.url,
                      class: normalizeClass(["menu-item", { active: ((_a2 = unref(subtitles).current.value) == null ? undefined : _a2.url) === subtitle.url }]),
                      onClick: ($event) => handleSubtitleSelect(subtitle)
                    }, toDisplayString(subtitle.label), 11, _hoisted_3$8);
                  }), 128))
                ]),
                _: 1
              }, 8, ["visible", "triggerRef"])
            ]);
          };
        }
      });
      const SubtitleButton = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-9e7cb59c"]]);
      const _hoisted_1$j = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$7(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$j, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18zm680-580H140v520h680zm-680 0v520zm196 320v-120q0-9.92-9.5-13.46T310-550l-49 49q-9 9-9 21t9 21l49 49q7 7 16.5 3.46T336-420m363-81-49-49q-7-7-16.5-3.46T624-540v120q0 9.92 9.5 13.46T650-410l49-49q9-9 9-21t-9-21" }, null, -1)
        ]));
      }
      const FitPageWidth = { render: render$7 };
      const _hoisted_1$i = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$6(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$i, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M140-160q-24.75 0-42.37-17.63Q80-195.25 80-220v-520q0-24.75 17.63-42.38Q115.25-800 140-800h680q24.75 0 42.38 17.62Q880-764.75 880-740v520q0 24.75-17.62 42.37Q844.75-160 820-160zm0-60h110v-520H140zm170 0h340v-520H310zm400 0h110v-520H710zM310-740v520z" }, null, -1)
        ]));
      }
      const WidthWide = { render: render$6 };
      const _hoisted_1$h = ["title"];
      const _sfc_main$d = /* @__PURE__ */ defineComponent({
        __name: "TheatreButton",
        setup(__props) {
          const { fullscreen } = usePlayerContext();
          return (_ctx, _cache) => {
            return !unref(fullscreen).isFullscreen.value ? (openBlock(), createElementBlock("button", {
              key: 0,
              title: unref(fullscreen).theatre.value ? "正常模式(V)" : "剧院模式(V)",
              onClick: _cache[0] || (_cache[0] = //@ts-ignore
              (...args) => unref(fullscreen).toggleTheatre && unref(fullscreen).toggleTheatre(...args))
            }, [
              createVNode(Icon, {
                svg: unref(fullscreen).theatre.value ? unref(WidthWide) : unref(FitPageWidth),
                class: "icon"
              }, null, 8, ["svg"])
            ], 8, _hoisted_1$h)) : createCommentVNode("", true);
          };
        }
      });
      const _sfc_main$c = /* @__PURE__ */ defineComponent({
        __name: "TimeDisplay",
        setup(__props) {
          const { progress } = usePlayerContext();
          return (_ctx, _cache) => {
            return openBlock(), createElementBlock("div", {
              class: normalizeClass(_ctx.$style["time-display"])
            }, [
              createElementVNode("span", null, toDisplayString(unref(formatTime)(unref(progress).currentTime.value)), 1),
              createElementVNode("span", {
                class: normalizeClass(_ctx.$style["time-separator"])
              }, "/", 2),
              createElementVNode("span", null, toDisplayString(unref(formatTime)(unref(progress).duration.value)), 1)
            ], 2);
          };
        }
      });
      const style0$2 = {
        "time-display": "_time-display_1fmcb_2",
        "time-separator": "_time-separator_1fmcb_12"
      };
      const cssModules$2 = {
        "$style": style0$2
      };
      const TimeDisplay = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__cssModules", cssModules$2]]);
      const _hoisted_1$g = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$5(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$g, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M360-360H230q-13 0-21.5-8.5T200-390v-180q0-13 8.5-21.5T230-600h130l149-149q14-14 32.5-6.5T560-728v496q0 20-18.5 27.5T509-211zm380-120q0 52-26 94t-73 64q-8 4-14.5-1t-6.5-13v-289q0-8 6.5-13t14.5-1q47 22 73 65t26 94M500-648 387-540H260v120h127l113 109zM378-480" }, null, -1)
        ]));
      }
      const VolumeDown = { render: render$5 };
      const _hoisted_1$f = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$4(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$f, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M681-188q-17 12-35.5 22T607-148q-12 5-24.5 0T565-165q-5-11 .5-22t17.5-16q15-5 28.5-12t26.5-17L473-397v165q0 20-18.5 27.5T422-211L273-360H143q-13 0-21.5-8.5T113-390v-180q0-13 8.5-21.5T143-600h126L70-799q-9-9-8.5-21.5T71-842t21.5-9 21.5 9l721 721q9 9 9 21.5T835-78t-22 9-22-9zm92-293q0-93-52.5-168.5T583-759q-12-5-17-16t0-22q5-12 17.5-16.5t25.5.5q101 41 162.5 130.5T833-481q0 38-7.5 75T802-334q-8 17-19.5 20.5T760-315t-16.5-14.5.5-20.5q15-30 22-63t7-68M576-628q38 23 57.5 63.5T653-480v15q0 7-2 15-2 10-11 13t-17-5l-61-61q-5-5-7-10t-2-11v-91q0-9 7.5-13.5t15.5.5m-196-57q-5-5-5-11t5-11l42-42q14-14 32.5-6.5T473-728v100q0 10-9.5 13.5T447-618zm33 379v-150l-84-84H173v120h126zm-42-192" }, null, -1)
        ]));
      }
      const VolumeOff = { render: render$4 };
      const _hoisted_1$e = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$3(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$e, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M780-481q0-94-52.5-169T590-759q-12-5-17-16t0-22q5-12 17.5-16.5t25.5.5q101 41 162.5 131T840-481t-61.5 201T616-149q-13 5-25.5.5T573-165q-5-11 0-22t17-16q85-34 137.5-109T780-481M280-360H150q-13 0-21.5-8.5T120-390v-180q0-13 8.5-21.5T150-600h130l149-149q14-14 32.5-6.5T480-728v496q0 20-18.5 27.5T429-211zm380-120q0 52-26 94t-73 64q-8 4-14.5-1t-6.5-13v-289q0-8 6.5-13t14.5-1q47 22 73 65t26 94M420-648 307-540H180v120h127l113 109zM298-480" }, null, -1)
        ]));
      }
      const VolumeUp = { render: render$3 };
      const _hoisted_1$d = ["value"];
      const _sfc_main$b = /* @__PURE__ */ defineComponent({
        __name: "VolumeControl",
        setup(__props) {
          const { volume } = usePlayerContext();
          const VolumeIcon = computed(() => {
            if (volume.muted.value) {
              return VolumeOff;
            }
            if (volume.volume.value < 50) {
              return VolumeDown;
            }
            if (volume.volume.value >= 50) {
              return VolumeUp;
            }
            return VolumeUp;
          });
          const handleVolumeChange = (event) => {
            const value = Number(event.target.value);
            volume.setVolume(value);
          };
          return (_ctx, _cache) => {
            return openBlock(), createElementBlock("div", {
              class: normalizeClass(_ctx.$style["volume-control"])
            }, [
              createElementVNode("button", {
                class: normalizeClass(_ctx.$style["volume-control-button"]),
                title: "音量",
                onClick: _cache[0] || (_cache[0] = //@ts-ignore
                (...args) => unref(volume).toggleMute && unref(volume).toggleMute(...args))
              }, [
                createVNode(Icon, {
                  svg: VolumeIcon.value,
                  class: normalizeClass(_ctx.$style.icon)
                }, null, 8, ["svg", "class"])
              ], 2),
              createElementVNode("div", {
                class: normalizeClass(_ctx.$style["volume-slider"])
              }, [
                createElementVNode("div", {
                  class: normalizeClass(_ctx.$style["volume-slider-container"])
                }, [
                  createElementVNode("div", {
                    class: normalizeClass(_ctx.$style["volume-slider-track"])
                  }, null, 2),
                  createElementVNode("div", {
                    class: normalizeClass(_ctx.$style["volume-slider-fill"]),
                    style: normalizeStyle({ width: `${unref(volume).volume.value}%` })
                  }, null, 6),
                  createElementVNode("div", {
                    class: normalizeClass(_ctx.$style["volume-slider-thumb"]),
                    style: normalizeStyle({ left: `${unref(volume).volume.value}%` })
                  }, null, 6),
                  createElementVNode("input", {
                    type: "range",
                    class: normalizeClass(_ctx.$style["volume-slider-input"]),
                    min: "0",
                    max: "100",
                    value: unref(volume).volume.value,
                    onInput: handleVolumeChange
                  }, null, 42, _hoisted_1$d)
                ], 2)
              ], 2)
            ], 2);
          };
        }
      });
      const icon = "_icon_10ec3_83";
      const style0$1 = {
        "volume-control": "_volume-control_10ec3_2",
        "volume-control-button": "_volume-control-button_10ec3_9",
        "volume-slider": "_volume-slider_10ec3_26",
        "volume-slider-container": "_volume-slider-container_10ec3_33",
        "volume-slider-track": "_volume-slider-track_10ec3_39",
        "volume-slider-fill": "_volume-slider-fill_10ec3_47",
        "volume-slider-thumb": "_volume-slider-thumb_10ec3_54",
        "volume-slider-input": "_volume-slider-input_10ec3_71",
        icon
      };
      const cssModules$1 = {
        "$style": style0$1
      };
      const VolumeControl = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__cssModules", cssModules$1]]);
      const _hoisted_1$c = { class: "controls-content" };
      const _hoisted_2$7 = { class: "controls-bar" };
      const _hoisted_3$7 = { class: "left-controls" };
      const _hoisted_4$6 = { class: "right-controls" };
      const _sfc_main$a = /* @__PURE__ */ defineComponent({
        __name: "index",
        setup(__props) {
          const { controls, source } = usePlayerContext();
          return (_ctx, _cache) => {
            return unref(source).list.value.length > 0 ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "controls-wrapper",
              onMouseenter: _cache[0] || (_cache[0] = ($event) => unref(controls).setIsMouseInControls(true)),
              onMouseleave: _cache[1] || (_cache[1] = ($event) => unref(controls).setIsMouseInControls(false))
            }, [
              createElementVNode("div", {
                class: normalizeClass(["controls-gradient", { "is-visible": unref(controls).visible.value }])
              }, null, 2),
              createElementVNode("div", {
                class: normalizeClass(["video-controls", { "is-visible": unref(controls).visible.value }])
              }, [
                createElementVNode("div", _hoisted_1$c, [
                  createVNode(ProgressBar),
                  createElementVNode("div", _hoisted_2$7, [
                    createElementVNode("div", _hoisted_3$7, [
                      createVNode(PlayButton),
                      createVNode(VolumeControl),
                      createVNode(TimeDisplay)
                    ]),
                    createElementVNode("div", _hoisted_4$6, [
                      createVNode(PlaybackRateButton),
                      createVNode(SubtitleButton),
                      createVNode(QualityButton),
                      createVNode(SettingsButton),
                      createVNode(_sfc_main$p),
                      createVNode(_sfc_main$d),
                      createVNode(_sfc_main$q)
                    ])
                  ]),
                  createVNode(ScrollTip)
                ])
              ], 2)
            ], 32)) : createCommentVNode("", true);
          };
        }
      });
      const VideoControls = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-9d837e9b"]]);
      const _hoisted_1$b = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$2(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$b, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M104-297v-366q0-14 9-22t21-8q5 0 9 1.5t8 4.5l263 182q7 5 10 11.5t3 13.5-3 13.5-10 11.5L151-273q-4 3-8 4.5t-9 1.5q-12 0-21-8t-9-22m407 0v-366q0-14 9-22t21-8q5 0 9 1.5t8 4.5l263 182q7 5 10 11.5t3 13.5-3 13.5-10 11.5L558-273q-4 3-8 4.5t-9 1.5q-12 0-21-8t-9-22m-347-58 181-125-181-125zm407 0 181-125-181-125z" }, null, -1)
        ]));
      }
      const FastForwardSvg = { render: render$2 };
      const _hoisted_1$a = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render$1(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$a, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M807-273 544-455q-7-5-10-11.5t-3-13.5 3-13.5 10-11.5l263-182q4-3 8-4.5t9-1.5q12 0 21 8t9 22v366q0 14-9 22t-21 8q-5 0-9-1.5t-8-4.5m-402 0L142-455q-7-5-10-11.5t-3-13.5 3-13.5 10-11.5l263-182q4-3 8-4.5t9-1.5q12 0 21 8t9 22v366q0 14-9 22t-21 8q-5 0-9-1.5t-8-4.5m-13-82v-250L211-480zm402 0v-250L613-480z" }, null, -1)
        ]));
      }
      const FastRewindSvg = { render: render$1 };
      const _hoisted_1$9 = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 -960 960 960"
      };
      function render(_ctx, _cache) {
        return openBlock(), createElementBlock("svg", _hoisted_1$9, _cache[0] || (_cache[0] = [
          createElementVNode("path", { d: "M390-860q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h180q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5zm90.18 447q12.82 0 21.32-8.63 8.5-8.62 8.5-21.37v-170q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v170q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63M480-81q-74 0-139.5-28.5T226-187t-77.5-114.5T120-441t28.5-139.5T226-695t114.5-77.5T480-801q67 0 126 22.5T711-716l30-30q9-9 21-9t21 9 9 21-9 21l-30 30q36 40 61.5 97T840-441q0 74-28.5 139.5T734-187t-114.5 77.5T480-81m0-60q125 0 212.5-87.5T780-441t-87.5-212.5T480-741t-212.5 87.5T180-441t87.5 212.5T480-141m0-299" }, null, -1)
        ]));
      }
      const TimerSvg = { render };
      const _sfc_main$9 = /* @__PURE__ */ defineComponent({
        __name: "index",
        setup(__props) {
          const playerContext = usePlayerContext();
          const { hud } = playerContext;
          const showMessage = ref(false);
          const message = computed(() => {
            return (hud == null ? undefined : hud.messages.value[0]) || null;
          });
          watch(message, (newMessage) => {
            showMessage.value = !!newMessage;
          });
          const hasProgressValue = (message2) => {
            var _a, _b, _c, _d;
            if (((_a = message2.data) == null ? undefined : _a.progress) !== undefined) {
              return true;
            }
            return ((_b = message2.data) == null ? undefined : _b.max) !== undefined && ((_c = message2.data) == null ? undefined : _c.min) !== undefined && ((_d = message2.data) == null ? undefined : _d.value) !== undefined && typeof message2.data.value === "number";
          };
          const getProgressPercentage = (message2) => {
            if (!message2.data) return 0;
            if (message2.data.progress !== undefined) {
              return message2.data.progress;
            }
            if (hasProgressValue(message2)) {
              const { value, min, max } = message2.data;
              return (Number(value) - Number(min)) / (Number(max) - Number(min)) * 100;
            }
            return 0;
          };
          return (_ctx, _cache) => {
            return openBlock(), createBlock(Popup, {
              visible: showMessage.value,
              "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => showMessage.value = $event),
              class: normalizeClass(_ctx.$style["hud-popup"]),
              x: 16,
              y: 16,
              lockControls: false
            }, {
              default: withCtx(() => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
                return [
                  createElementVNode("div", {
                    class: normalizeClass(_ctx.$style["hud-message-content"])
                  }, [
                    createElementVNode("div", {
                      class: normalizeClass(_ctx.$style["message-icon"])
                    }, [
                      ((_a = message.value) == null ? undefined : _a.type) === "volume" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                        ((_b = message.value.data) == null ? undefined : _b.value) === 0 ? (openBlock(), createBlock(Icon, {
                          key: 0,
                          svg: unref(VolumeOff)
                        }, null, 8, ["svg"])) : Number((_c = message.value.data) == null ? undefined : _c.value) < 33 ? (openBlock(), createBlock(Icon, {
                          key: 1,
                          svg: unref(VolumeDown)
                        }, null, 8, ["svg"])) : Number((_d = message.value.data) == null ? undefined : _d.value) < 66 ? (openBlock(), createBlock(Icon, {
                          key: 2,
                          svg: unref(VolumeDown)
                        }, null, 8, ["svg"])) : (openBlock(), createBlock(Icon, {
                          key: 3,
                          svg: unref(VolumeUp)
                        }, null, 8, ["svg"]))
                      ], 64)) : ((_e = message.value) == null ? undefined : _e.type) === "mute" ? (openBlock(), createBlock(Icon, {
                        key: 1,
                        svg: message.value.title === "静音" ? unref(VolumeOff) : unref(VolumeUp)
                      }, null, 8, ["svg"])) : ((_f = message.value) == null ? undefined : _f.type) === "speed" ? (openBlock(), createBlock(Icon, {
                        key: 2,
                        svg: unref(TimerSvg)
                      }, null, 8, ["svg"])) : ((_g = message.value) == null ? undefined : _g.type) === "fastForward" ? (openBlock(), createBlock(Icon, {
                        key: 3,
                        svg: unref(FastForwardSvg)
                      }, null, 8, ["svg"])) : ((_h = message.value) == null ? undefined : _h.type) === "fastBackward" ? (openBlock(), createBlock(Icon, {
                        key: 4,
                        svg: unref(FastRewindSvg)
                      }, null, 8, ["svg"])) : ((_i = message.value) == null ? undefined : _i.type) === "subtitle" ? (openBlock(), createBlock(Icon, {
                        key: 5,
                        svg: ((_j = message.value.data) == null ? undefined : _j.value) === "关闭" || message.value.title === "字幕" && ((_k = message.value.data) == null ? undefined : _k.value) === null ? unref(SubtitlesOff) : unref(Subtitles)
                      }, null, 8, ["svg"])) : ((_l = message.value) == null ? undefined : _l.type) === "transform" ? (openBlock(), createElementBlock(Fragment, { key: 6 }, [
                        message.value.title === "旋转" ? (openBlock(), createBlock(Icon, {
                          key: 0,
                          svg: unref(RotateSvg)
                        }, null, 8, ["svg"])) : message.value.title === "水平翻转" ? (openBlock(), createBlock(Icon, {
                          key: 1,
                          svg: unref(FlipSvg),
                          style: { "transform": "rotate(90deg)" }
                        }, null, 8, ["svg"])) : message.value.title === "垂直翻转" ? (openBlock(), createBlock(Icon, {
                          key: 2,
                          svg: unref(FlipSvg)
                        }, null, 8, ["svg"])) : createCommentVNode("", true)
                      ], 64)) : createCommentVNode("", true)
                    ], 2),
                    createElementVNode("div", {
                      class: normalizeClass(_ctx.$style["message-body"])
                    }, [
                      message.value ? (openBlock(), createElementBlock("div", {
                        key: 0,
                        class: normalizeClass(_ctx.$style["message-title"])
                      }, toDisplayString(message.value.title), 3)) : createCommentVNode("", true),
                      message.value && hasProgressValue(message.value) ? (openBlock(), createElementBlock("div", {
                        key: 1,
                        class: normalizeClass(_ctx.$style["message-progress"])
                      }, [
                        createElementVNode("div", {
                          class: normalizeClass(_ctx.$style["message-progress-bar"]),
                          style: normalizeStyle({ width: `${getProgressPercentage(message.value)}%` })
                        }, null, 6)
                      ], 2)) : ((_n = (_m = message.value) == null ? undefined : _m.data) == null ? undefined : _n.value) !== undefined && typeof message.value.data.value !== "boolean" ? (openBlock(), createElementBlock("div", {
                        key: 2,
                        class: normalizeClass(_ctx.$style["message-value"])
                      }, toDisplayString(message.value.data.value), 3)) : createCommentVNode("", true)
                    ], 2)
                  ], 2)
                ];
              }),
              _: 1
            }, 8, ["visible", "class"]);
          };
        }
      });
      const style0 = {
        "hud-popup": "_hud-popup_2mlsy_2",
        "hud-message-content": "_hud-message-content_2mlsy_13",
        "message-icon": "_message-icon_2mlsy_22",
        "message-body": "_message-body_2mlsy_33",
        "message-title": "_message-title_2mlsy_40",
        "message-value": "_message-value_2mlsy_47",
        "message-progress": "_message-progress_2mlsy_54",
        "message-progress-bar": "_message-progress-bar_2mlsy_63"
      };
      const cssModules = {
        "$style": style0
      };
      const HUD = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__cssModules", cssModules]]);
      const _hoisted_1$8 = { class: "loading-container" };
      const _sfc_main$8 = /* @__PURE__ */ defineComponent({
        __name: "index",
        props: {
          show: { type: Boolean }
        },
        setup(__props) {
          return (_ctx, _cache) => {
            return withDirectives((openBlock(), createElementBlock("div", _hoisted_1$8, _cache[0] || (_cache[0] = [
              createElementVNode("div", { class: "apple-loading" }, [
                createElementVNode("span"),
                createElementVNode("span"),
                createElementVNode("span")
              ], -1)
            ]), 512)), [
              [vShow, _ctx.show]
            ]);
          };
        }
      });
      const Loading = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-45219110"]]);
      const _hoisted_1$7 = {
        key: 0,
        class: "play-animation"
      };
      const _hoisted_2$6 = { class: "play-animation-icon" };
      const _hoisted_3$6 = { class: "icon-wrapper" };
      const _sfc_main$7 = /* @__PURE__ */ defineComponent({
        __name: "index",
        setup(__props) {
          const { playing } = usePlayerContext();
          const visible = shallowRef(false);
          const timer = shallowRef(null);
          watch(playing.isPlaying, (value) => {
            visible.value = true;
            if (timer.value) {
              clearTimeout(timer.value);
            }
            timer.value = window.setTimeout(() => {
              visible.value = false;
            }, 300);
          });
          return (_ctx, _cache) => {
            return openBlock(), createBlock(Transition, { name: "fade" }, {
              default: withCtx(() => [
                visible.value ? (openBlock(), createElementBlock("div", _hoisted_1$7, [
                  createElementVNode("div", _hoisted_2$6, [
                    createElementVNode("div", _hoisted_3$6, [
                      createVNode(Icon, {
                        svg: unref(playing).isPlaying.value ? unref(Play) : unref(Pause),
                        size: "50px"
                      }, null, 8, ["svg"])
                    ])
                  ])
                ])) : createCommentVNode("", true)
              ]),
              _: 1
            });
          };
        }
      });
      const PlayAnimation = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-d27e8469"]]);
      const _hoisted_1$6 = { class: "player-container" };
      const _hoisted_2$5 = { class: "video-container" };
      const _hoisted_3$5 = ["poster", "muted", "volume", "autoplay", "loop"];
      const _hoisted_4$5 = ["src", "label", "srclang", "kind", "default"];
      const _hoisted_5$5 = {
        key: 0,
        class: "resume-container"
      };
      const _sfc_main$6 = /* @__PURE__ */ defineComponent({
        __name: "index",
        props: {
          sources: {},
          theatre: { type: Boolean },
          volume: {},
          muted: { type: Boolean },
          playbackRate: {},
          preferences: {},
          onThumbnailRequest: { type: Function, default: undefined },
          subtitles: {},
          subtitlesReady: {},
          subtitlesLoading: {},
          onSubtitleChange: { type: Function, default: undefined }
        },
        emits: ["updateCurrentTime", "update:theatre", "update:volume", "update:muted", "update:playbackRate"],
        setup(__props, { expose: __expose, emit: __emit }) {
          const props = __props;
          const emit = __emit;
          const rootRef = shallowRef(null);
          const videoElementRef = shallowRef(null);
          const videoMaskRef = shallowRef(null);
          const portalContext = usePortalProvider();
          const { fullscreen, volume, playing, source, subtitles, progress, transform } = usePlayerProvide(props, emit, {
            rootRef,
            videoElementRef,
            videoMaskRef
          });
          __expose({
            togglePlay: playing.togglePlay,
            interruptSource: source.interruptSource,
            seekTo: progress.seekTo
          });
          return (_ctx, _cache) => {
            var _a;
            return openBlock(), createElementBlock("div", {
              class: normalizeClass(["x-player", { "is-fullscreen": unref(fullscreen).isFullscreen.value }]),
              ref_key: "rootRef",
              ref: rootRef
            }, [
              createElementVNode("div", _hoisted_1$6, [
                createElementVNode("div", _hoisted_2$5, [
                  (openBlock(), createElementBlock("video", {
                    ref_key: "videoElementRef",
                    ref: videoElementRef,
                    key: unref(source).videoKey.value,
                    poster: (_a = unref(source).current.value) == null ? undefined : _a.poster,
                    muted: unref(volume).muted.value,
                    volume: unref(volume).volume.value / 100,
                    autoplay: unref(playing).autoplay.value,
                    loop: unref(playing).loop.value,
                    controls: false,
                    playsinline: true,
                    "webkit-playsinline": true,
                    style: normalizeStyle(unref(transform).transformStyle.value),
                    onClick: _cache[0] || (_cache[0] = //@ts-ignore
                    (...args) => unref(playing).togglePlay && unref(playing).togglePlay(...args))
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(subtitles).list.value, (subtitle, index2) => {
                      return openBlock(), createElementBlock("track", {
                        key: index2,
                        src: subtitle.url,
                        label: subtitle.label,
                        srclang: subtitle.srclang,
                        kind: subtitle.kind,
                        default: subtitle.default
                      }, null, 8, _hoisted_4$5);
                    }), 128))
                  ], 12, _hoisted_3$5)),
                  createVNode(PlayAnimation),
                  createVNode(Loading, {
                    show: unref(playing).isLoading.value
                  }, null, 8, ["show"]),
                  createElementVNode("div", {
                    class: "video-mask",
                    ref_key: "videoMaskRef",
                    ref: videoMaskRef,
                    onClick: _cache[1] || (_cache[1] = //@ts-ignore
                    (...args) => unref(playing).togglePlay && unref(playing).togglePlay(...args)),
                    onDblclick: _cache[2] || (_cache[2] = //@ts-ignore
                    (...args) => unref(fullscreen).toggleFullscreen && unref(fullscreen).toggleFullscreen(...args))
                  }, null, 544),
                  createVNode(VideoControls)
                ])
              ]),
              createElementVNode("div", {
                class: "portal-container",
                ref: unref(portalContext).container
              }, null, 512),
              createVNode(HUD),
              unref(source).isInterrupt.value ? (openBlock(), createElementBlock("div", _hoisted_5$5, [
                createElementVNode("button", {
                  onClick: _cache[3] || (_cache[3] = //@ts-ignore
                  (...args) => unref(source).resumeSource && unref(source).resumeSource(...args))
                }, "恢复")
              ])) : createCommentVNode("", true)
            ], 2);
          };
        }
      });
      const XPlayer = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-fa402ca6"]]);
      const useParamsVideoPage = () => {
        const pickCode = ref();
        const avNumber = ref();
        const cid = ref();
        const title = ref();
        const getParams = () => {
          const params = new URLSearchParams(window.location.search);
          pickCode.value = params.get("pick_code");
          avNumber.value = params.get("avNumber") || null;
          cid.value = params.get("cid");
          title.value = params.get("title");
        };
        getParams();
        return {
          pickCode,
          avNumber,
          cid,
          title,
          getParams
        };
      };
      const _hoisted_1$5 = {
        key: 0,
        class: "header-file"
      };
      const _hoisted_2$4 = {
        key: 1,
        class: "header-file"
      };
      const _hoisted_3$4 = {
        key: 2,
        class: "header-file"
      };
      const _hoisted_4$4 = { class: "header-file-text" };
      const _hoisted_5$4 = { class: "header-file-text-size" };
      const _sfc_main$5 = /* @__PURE__ */ defineComponent({
        __name: "index",
        props: {
          fileInfo: {}
        },
        setup(__props) {
          return (_ctx, _cache) => {
            var _a, _b, _c;
            return _ctx.fileInfo.error ? (openBlock(), createElementBlock("div", _hoisted_1$5, _cache[0] || (_cache[0] = [
              createElementVNode("div", { class: "header-file-error" }, [
                createElementVNode("span", null, "❌ 获取文件信息失败")
              ], -1)
            ]))) : _ctx.fileInfo.isLoading || !_ctx.fileInfo.isLoading && !_ctx.fileInfo.isReady ? (openBlock(), createElementBlock("div", _hoisted_2$4, [
              createVNode(Skeleton, {
                width: "320px",
                height: "28px"
              })
            ])) : (openBlock(), createElementBlock("div", _hoisted_3$4, [
              createElementVNode("span", _hoisted_4$4, [
                createTextVNode(toDisplayString((_b = (_a = _ctx.fileInfo.state) == null ? undefined : _a.file_name) == null ? undefined : _b.toUpperCase()) + " ", 1),
                createElementVNode("span", _hoisted_5$4, toDisplayString(unref(formatFileSize)(Number((_c = _ctx.fileInfo.state) == null ? undefined : _c.file_size))), 1)
              ])
            ]));
          };
        }
      });
      const FileInfo = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-708d094e"]]);
      const _hoisted_1$4 = { class: "footer-tags" };
      const _hoisted_2$3 = ["href"];
      const _hoisted_3$3 = ["href"];
      const _hoisted_4$3 = ["src"];
      const _hoisted_5$3 = {
        href: "https://github.com/cbingb666",
        target: "_blank"
      };
      const _hoisted_6$3 = ["src"];
      const _sfc_main$4 = /* @__PURE__ */ defineComponent({
        __name: "index",
        setup(__props) {
          const info = computed(() => {
            return {
              version: _GM_info.script.version,
              author: _GM_info.script.author,
              homepage: _GM_info.script.homepage
            };
          });
          return (_ctx, _cache) => {
            return openBlock(), createElementBlock("footer", null, [
              _cache[1] || (_cache[1] = createElementVNode("p", null, "如果觉得这个脚本爆赞 👍", -1)),
              _cache[2] || (_cache[2] = createElementVNode("p", null, [
                createTextVNode("请帮我点个 "),
                createElementVNode("a", {
                  href: "https://github.com/cbingb666/115Master",
                  target: "_blank"
                }, "⭐"),
                createTextVNode(" 支持我开发更多有趣的功能吧~")
              ], -1)),
              createElementVNode("div", _hoisted_1$4, [
                createElementVNode("a", {
                  href: info.value.homepage,
                  target: "_blank"
                }, _cache[0] || (_cache[0] = [
                  createElementVNode("img", {
                    src: `https://img.shields.io/badge/GitHub-115Master-yellow`,
                    alt: "GitHub"
                  }, null, -1)
                ]), 8, _hoisted_2$3),
                createElementVNode("a", {
                  href: `https://github.com/cbingb666/115Master/releases/tag/v${info.value.version}`,
                  target: "_blank"
                }, [
                  createElementVNode("img", {
                    src: `https://img.shields.io/badge/Version-${info.value.version.replace(/-/g, ".")}-green`,
                    alt: "Version"
                  }, null, 8, _hoisted_4$3)
                ], 8, _hoisted_3$3),
                createElementVNode("a", _hoisted_5$3, [
                  createElementVNode("img", {
                    src: `https://img.shields.io/badge/Author-${info.value.author}-red`,
                    alt: "Author"
                  }, null, 8, _hoisted_6$3)
                ])
              ])
            ]);
          };
        }
      });
      const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-c19dfa52"]]);
      function useCopy(duration = 2e3) {
        const isCopied = ref(false);
        const copyText = async (text) => {
          if (!text) return;
          try {
            await navigator.clipboard.writeText(text);
            isCopied.value = true;
            setTimeout(() => {
              isCopied.value = false;
            }, duration);
          } catch (err) {
            console.error("复制失败:", err);
            throw err;
          }
        };
        return {
          isCopied,
          copyText
        };
      }
      const _hoisted_1$3 = { class: "copy-button-text" };
      const _sfc_main$3 = /* @__PURE__ */ defineComponent({
        __name: "CopyButton",
        props: {
          text: {},
          duration: {}
        },
        setup(__props) {
          const props = __props;
          const { isCopied, copyText } = useCopy(props.duration);
          const handleCopy = async () => {
            try {
              await copyText(props.text);
            } catch (error) {
            }
          };
          return (_ctx, _cache) => {
            return openBlock(), createElementBlock("button", {
              class: normalizeClass(["copy-button", { copied: unref(isCopied) }]),
              onClick: handleCopy
            }, [
              createElementVNode("span", _hoisted_1$3, toDisplayString(unref(isCopied) ? "已复制" : "复制"), 1)
            ], 2);
          };
        }
      });
      const CopyButton = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-a529d9a0"]]);
      const _hoisted_1$2 = { class: "movie-info" };
      const _hoisted_2$2 = { class: "movie-info-main" };
      const _hoisted_3$2 = { class: "movie-info-source-switch" };
      const _hoisted_4$2 = { class: "movie-info-header" };
      const _hoisted_5$2 = { class: "movie-info-header-title" };
      const _hoisted_6$2 = { class: "movie-info-header-actors" };
      const _hoisted_7$1 = { class: "movie-info-header-actors-item-content" };
      const _hoisted_8 = { class: "movie-info-header-actors-item-avatar" };
      const _hoisted_9 = {
        class: "movie-info-content",
        style: { "margin-top": "24px" }
      };
      const _hoisted_10 = { class: "movie-info-header-title" };
      const _hoisted_11 = { class: "movie-info-header-title-text" };
      const _hoisted_12 = { class: "movie-info-header-actors" };
      const _hoisted_13 = ["href"];
      const _hoisted_14 = { class: "movie-info-header-actors-item-avatar" };
      const _hoisted_15 = ["src", "alt"];
      const _hoisted_16 = { class: "movie-info-header-actors-item-name" };
      const _hoisted_17 = {
        key: 1,
        class: "movie-info-header-actors-item-content"
      };
      const _hoisted_18 = { class: "movie-info-header-actors-item-avatar" };
      const _hoisted_19 = ["src", "alt"];
      const _hoisted_20 = { class: "movie-info-header-actors-item-name" };
      const _hoisted_21 = { class: "movie-info-content" };
      const _hoisted_22 = { class: "movie-info-content-item" };
      const _hoisted_23 = { class: "movie-info-content-item-value" };
      const _hoisted_24 = ["href"];
      const _hoisted_25 = { class: "movie-info-content-item" };
      const _hoisted_26 = { class: "movie-info-content-item-value" };
      const _hoisted_27 = { class: "movie-info-content-item" };
      const _hoisted_28 = { class: "movie-info-content-item-value" };
      const _hoisted_29 = { class: "movie-info-content-item" };
      const _hoisted_30 = {
        key: 0,
        class: "movie-info-content-item-value"
      };
      const _hoisted_31 = {
        key: 1,
        class: "movie-info-content-item-value"
      };
      const _hoisted_32 = ["href"];
      const _hoisted_33 = { class: "movie-info-content-item" };
      const _hoisted_34 = {
        key: 0,
        class: "movie-info-content-item-value"
      };
      const _hoisted_35 = {
        key: 1,
        class: "movie-info-content-item-value"
      };
      const _hoisted_36 = ["href"];
      const _hoisted_37 = { class: "movie-info-content-item" };
      const _hoisted_38 = {
        key: 0,
        class: "movie-info-content-item-value"
      };
      const _hoisted_39 = {
        key: 1,
        class: "movie-info-content-item-value"
      };
      const _hoisted_40 = ["href"];
      const _hoisted_41 = { class: "movie-info-content-item" };
      const _hoisted_42 = {
        key: 0,
        class: "movie-info-content-item-value"
      };
      const _hoisted_43 = {
        key: 1,
        class: "movie-info-content-item-value"
      };
      const _hoisted_44 = ["href"];
      const _hoisted_45 = ["href"];
      const _hoisted_46 = ["src"];
      const DEFAULT_AVATAR = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2NjYyI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MxLjY2IDAgMyAxLjM0IDMgM3MtMS4zNCAzLTMgMy0zLTEuMzQtMy0zIDEuMzQtMyAzLTN6bTAgMTQuMmMtMi41IDAtNC43MS0xLjI4LTYtMy4yMi4wMy0xLjk5IDQtMy4wOCA2LTMuMDggMS45OSAwIDUuOTcgMS4wOSA2IDMuMDgtMS4yOSAxLjk0LTMuNSAzLjIyLTYgMy4yMnoiLz48L3N2Zz4=";
      const _sfc_main$2 = /* @__PURE__ */ defineComponent({
        __name: "index",
        props: {
          movieInfos: {}
        },
        setup(__props) {
          const props = __props;
          const movieInfoThumb = ref(null);
          const lightbox = ref(null);
          const activeSource = ref("javDBState");
          const movieInfo = computed(
            () => {
              return props.movieInfos[activeSource.value];
            }
          );
          watch(movieInfoThumb, async () => {
            var _a;
            if (!movieInfoThumb.value) return;
            (_a = lightbox.value) == null ? undefined : _a.destroy();
            await nextTick();
            lightbox.value = new PhotoSwipeLightbox({
              gallery: movieInfoThumb.value,
              children: ".movie-info-thumb-item",
              pswpModule: () => __vitePreload(() => module.import('photoswipe'), void 0 ),
              mouseMovePan: true,
              initialZoomLevel: "fit",
              wheelToZoom: true
            });
            lightbox.value.init();
            lightbox.value.addFilter("domItemData", (itemData, element) => {
              var _a2, _b;
              itemData.width = (_a2 = element.querySelector("img")) == null ? undefined : _a2.naturalWidth;
              itemData.height = (_b = element.querySelector("img")) == null ? undefined : _b.naturalHeight;
              return itemData;
            });
          });
          return (_ctx, _cache) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
            return openBlock(), createElementBlock("div", _hoisted_1$2, [
              createElementVNode("div", _hoisted_2$2, [
                createElementVNode("div", _hoisted_3$2, [
                  createElementVNode("div", {
                    class: normalizeClass(["movie-info-source-switch-item", { active: activeSource.value === "javDBState" }]),
                    onClick: _cache[0] || (_cache[0] = ($event) => activeSource.value = "javDBState")
                  }, _cache[2] || (_cache[2] = [
                    createElementVNode("span", { class: "movie-info-source-switch-item-text" }, "JavDB", -1)
                  ]), 2),
                  createElementVNode("div", {
                    class: normalizeClass(["movie-info-source-switch-item", { active: activeSource.value === "javBusState" }]),
                    onClick: _cache[1] || (_cache[1] = ($event) => activeSource.value = "javBusState")
                  }, _cache[3] || (_cache[3] = [
                    createElementVNode("span", { class: "movie-info-source-switch-item-text" }, "JavBus", -1)
                  ]), 2)
                ]),
                movieInfo.value.error.value ? (openBlock(), createBlock(LoadingError, {
                  key: 0,
                  style: { "margin": "80px auto 40px" },
                  message: "获取影片信息失败，可能由于网络异常或者您没有科学上网",
                  detail: movieInfo.value.error.value.toString()
                }, null, 8, ["detail"])) : movieInfo.value.isLoading.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createElementVNode("div", _hoisted_4$2, [
                    createElementVNode("div", _hoisted_5$2, [
                      createVNode(Skeleton, {
                        width: "80%",
                        height: "56px"
                      })
                    ])
                  ]),
                  createElementVNode("div", _hoisted_6$2, [
                    (openBlock(), createElementBlock(Fragment, null, renderList(1, (i) => {
                      return createElementVNode("div", {
                        class: "movie-info-header-actors-item",
                        key: i
                      }, [
                        createElementVNode("div", _hoisted_7$1, [
                          createElementVNode("div", _hoisted_8, [
                            createVNode(Skeleton, {
                              circle: "",
                              width: "60px",
                              height: "60px"
                            })
                          ]),
                          createVNode(Skeleton, {
                            width: "100px",
                            height: "22.5px"
                          })
                        ])
                      ]);
                    }), 64))
                  ]),
                  createElementVNode("div", _hoisted_9, [
                    (openBlock(), createElementBlock(Fragment, null, renderList(7, (i) => {
                      return createElementVNode("div", {
                        class: "movie-info-content-item",
                        key: i
                      }, [
                        createVNode(Skeleton, {
                          width: `${80 + Math.random() * 80}px`,
                          height: "20px"
                        }, null, 8, ["width"])
                      ]);
                    }), 64))
                  ])
                ], 64)) : !movieInfo.value.state.value ? (openBlock(), createBlock(Empty, {
                  key: 2,
                  style: { "margin": "80px auto 40px" },
                  description: "暂无影片信息，可能番号无法识别",
                  "image-size": 200
                })) : (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                  (openBlock(), createElementBlock("div", {
                    class: "movie-info-header",
                    key: activeSource.value
                  }, [
                    createElementVNode("div", _hoisted_10, [
                      createElementVNode("span", _hoisted_11, toDisplayString((_a = movieInfo.value.state.value) == null ? undefined : _a.title), 1)
                    ]),
                    createElementVNode("div", _hoisted_12, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList((_b = movieInfo.value.state.value) == null ? undefined : _b.actors, (actor) => {
                        return openBlock(), createElementBlock("div", {
                          class: "movie-info-header-actors-item",
                          key: actor.name
                        }, [
                          actor.url ? (openBlock(), createElementBlock("a", {
                            key: 0,
                            class: "movie-info-header-actors-item-content",
                            href: actor.url,
                            target: "_blank"
                          }, [
                            createElementVNode("div", _hoisted_14, [
                              createElementVNode("img", {
                                src: actor.face || DEFAULT_AVATAR,
                                alt: actor.name
                              }, null, 8, _hoisted_15),
                              actor.sex !== undefined ? (openBlock(), createElementBlock("span", {
                                key: 0,
                                class: normalizeClass(["movie-info-header-actors-item-sex", { female: actor.sex === 1, male: actor.sex === 0 }])
                              }, toDisplayString(actor.sex === 1 ? "♀" : "♂"), 3)) : createCommentVNode("", true)
                            ]),
                            createElementVNode("span", _hoisted_16, toDisplayString(actor.name), 1)
                          ], 8, _hoisted_13)) : (openBlock(), createElementBlock("div", _hoisted_17, [
                            createElementVNode("div", _hoisted_18, [
                              createElementVNode("img", {
                                src: actor.face || DEFAULT_AVATAR,
                                alt: actor.name
                              }, null, 8, _hoisted_19),
                              actor.sex !== undefined ? (openBlock(), createElementBlock("span", {
                                key: 0,
                                class: normalizeClass(["movie-info-header-actors-item-sex", { female: actor.sex === 1, male: actor.sex === 0 }])
                              }, toDisplayString(actor.sex === 1 ? "♀" : "♂"), 3)) : createCommentVNode("", true)
                            ]),
                            createElementVNode("span", _hoisted_20, toDisplayString(actor.name), 1)
                          ]))
                        ]);
                      }), 128))
                    ])
                  ])),
                  createElementVNode("div", _hoisted_21, [
                    createElementVNode("div", _hoisted_22, [
                      _cache[4] || (_cache[4] = createElementVNode("span", { class: "movie-info-content-item-label" }, " 番号： ", -1)),
                      createElementVNode("span", _hoisted_23, [
                        createElementVNode("a", {
                          href: (_c = movieInfo.value.state.value) == null ? undefined : _c.detailUrl,
                          target: "_blank"
                        }, toDisplayString(((_d = movieInfo.value.state.value) == null ? undefined : _d.avNumber) ?? "-"), 9, _hoisted_24),
                        ((_e = movieInfo.value.state.value) == null ? undefined : _e.avNumber) ? (openBlock(), createBlock(CopyButton, {
                          key: 0,
                          text: (_f = movieInfo.value.state.value) == null ? undefined : _f.avNumber
                        }, null, 8, ["text"])) : createCommentVNode("", true)
                      ])
                    ]),
                    createElementVNode("div", _hoisted_25, [
                      _cache[5] || (_cache[5] = createElementVNode("span", { class: "movie-info-content-item-label" }, " 日期： ", -1)),
                      createElementVNode("span", _hoisted_26, toDisplayString(unref(formatDate)((_g = movieInfo.value.state.value) == null ? undefined : _g.date) ?? "-"), 1)
                    ]),
                    createElementVNode("div", _hoisted_27, [
                      _cache[6] || (_cache[6] = createElementVNode("span", { class: "movie-info-content-item-label" }, " 时长： ", -1)),
                      createElementVNode("span", _hoisted_28, toDisplayString(unref(formatDuration)((_h = movieInfo.value.state.value) == null ? undefined : _h.duration) ?? "-"), 1)
                    ]),
                    createElementVNode("div", _hoisted_29, [
                      _cache[7] || (_cache[7] = createElementVNode("span", { class: "movie-info-content-item-label" }, " 导演： ", -1)),
                      !((_i = movieInfo.value.state.value) == null ? undefined : _i.director) ? (openBlock(), createElementBlock("span", _hoisted_30, "-")) : (openBlock(), createElementBlock("span", _hoisted_31, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList((_j = movieInfo.value.state.value) == null ? undefined : _j.director, (director) => {
                          return openBlock(), createElementBlock("a", {
                            key: director.name,
                            href: director.url,
                            target: "_blank"
                          }, toDisplayString(director.name), 9, _hoisted_32);
                        }), 128))
                      ]))
                    ]),
                    createElementVNode("div", _hoisted_33, [
                      _cache[8] || (_cache[8] = createElementVNode("span", { class: "movie-info-content-item-label" }, " 片商： ", -1)),
                      !((_k = movieInfo.value.state.value) == null ? undefined : _k.studio) ? (openBlock(), createElementBlock("span", _hoisted_34, "-")) : (openBlock(), createElementBlock("span", _hoisted_35, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList((_l = movieInfo.value.state.value) == null ? undefined : _l.studio, (studio) => {
                          return openBlock(), createElementBlock("a", {
                            key: studio.name,
                            href: studio.url,
                            target: "_blank"
                          }, toDisplayString(studio.name), 9, _hoisted_36);
                        }), 128))
                      ]))
                    ]),
                    createElementVNode("div", _hoisted_37, [
                      _cache[9] || (_cache[9] = createElementVNode("span", { class: "movie-info-content-item-label" }, " 系列： ", -1)),
                      !((_m = movieInfo.value.state.value) == null ? undefined : _m.series) ? (openBlock(), createElementBlock("span", _hoisted_38, "-")) : (openBlock(), createElementBlock("span", _hoisted_39, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList((_n = movieInfo.value.state.value) == null ? undefined : _n.series, (serie) => {
                          return openBlock(), createElementBlock("a", {
                            key: serie.name,
                            href: serie.url,
                            target: "_blank"
                          }, toDisplayString(serie.name), 9, _hoisted_40);
                        }), 128))
                      ]))
                    ]),
                    createElementVNode("div", _hoisted_41, [
                      _cache[10] || (_cache[10] = createElementVNode("span", { class: "movie-info-content-item-label" }, " 类别： ", -1)),
                      !((_o = movieInfo.value.state.value) == null ? undefined : _o.category) ? (openBlock(), createElementBlock("span", _hoisted_42, "-")) : (openBlock(), createElementBlock("span", _hoisted_43, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList((_p = movieInfo.value.state.value) == null ? undefined : _p.category, (category) => {
                          return openBlock(), createElementBlock("a", {
                            key: category.name,
                            href: category.url,
                            target: "_blank"
                          }, toDisplayString(category.name), 9, _hoisted_44);
                        }), 128))
                      ]))
                    ])
                  ]),
                  createElementVNode("div", {
                    class: "movie-info-thumb",
                    ref_key: "movieInfoThumb",
                    ref: movieInfoThumb
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList((_q = movieInfo.value.state.value) == null ? undefined : _q.preview, (item) => {
                      return openBlock(), createElementBlock("a", {
                        class: "movie-info-thumb-item",
                        key: item.thumbnail,
                        href: item.raw,
                        target: "_blank"
                      }, [
                        createElementVNode("img", {
                          src: item.raw,
                          alt: "thumb",
                          loading: "lazy"
                        }, null, 8, _hoisted_46)
                      ], 8, _hoisted_45);
                    }), 128))
                  ], 512)
                ], 64))
              ])
            ]);
          };
        }
      });
      const MovieInfo = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-3fde5513"]]);
      const _hoisted_1$1 = { class: "playlist" };
      const _hoisted_2$1 = {
        key: 0,
        class: "playlist-list"
      };
      const _hoisted_3$1 = {
        key: 1,
        class: "playlist-list"
      };
      const _hoisted_4$1 = {
        key: 2,
        class: "playlist-list"
      };
      const _hoisted_5$1 = ["onClick"];
      const _hoisted_6$1 = { class: "playlist-item-title" };
      const _hoisted_7 = { class: "playlist-item-size" };
      const _sfc_main$1 = /* @__PURE__ */ defineComponent({
        __name: "index",
        props: {
          playlist: {},
          pickCode: {}
        },
        emits: ["play"],
        setup(__props, { emit: __emit }) {
          const props = __props;
          const emit = __emit;
          const handlePlay = (item) => {
            if (item.pc === props.pickCode) {
              return;
            }
            emit("play", item);
          };
          return (_ctx, _cache) => {
            return openBlock(), createElementBlock("div", _hoisted_1$1, [
              _cache[0] || (_cache[0] = createElementVNode("div", { class: "playlist-header" }, " 播放列表 ", -1)),
              _ctx.playlist.error ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
                createVNode(LoadingError)
              ])) : _ctx.playlist.isLoading || !_ctx.playlist.isLoading && !_ctx.playlist.isReady ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
                (openBlock(), createElementBlock(Fragment, null, renderList(1, (i) => {
                  return createVNode(Skeleton, {
                    width: "100%",
                    height: "60.5px",
                    "border-radius": "8px",
                    key: i
                  });
                }), 64))
              ])) : (openBlock(), createElementBlock("div", _hoisted_4$1, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.playlist.state, (item) => {
                  return openBlock(), createElementBlock("div", {
                    class: normalizeClass(["playlist-item", { active: item.pc === _ctx.pickCode }]),
                    key: item.pc,
                    onClick: ($event) => handlePlay(item)
                  }, [
                    createElementVNode("div", _hoisted_6$1, toDisplayString(item.n), 1),
                    createElementVNode("div", _hoisted_7, toDisplayString(unref(formatFileSize)(item.s)), 1)
                  ], 10, _hoisted_5$1);
                }), 128))
              ]))
            ]);
          };
        }
      });
      const Playlist = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1718588c"]]);
      const useDataFileInfo = () => {
        const fileInfo = useAsyncState(
          async (pickCode) => {
            const response = await Drive115Instance.getFileInfo({
              pickcode: pickCode,
              share_id: "0",
              local: "1"
            });
            return response;
          },
          {},
          {
            immediate: false
          }
        );
        return reactive(fileInfo);
      };
      const useDataHistory = (xplayerRef) => {
        const isinit = shallowRef(false);
        const pickcode = shallowRef("");
        const update = (time) => {
          if (!isinit.value || !pickcode.value) {
            return;
          }
          Drive115Instance.VodApiPostWebApiFilesHistory({
            op: "update",
            pick_code: pickcode.value,
            share_id: "0",
            category: "1",
            definition: "0",
            time
          });
        };
        const updateThrottle = useThrottleFn((time) => {
          update(time);
        }, 3e3);
        const handleUpdateCurrentTime = ({
          time,
          isManual
        }) => {
          if (isManual) {
            update(time);
          } else {
            updateThrottle(time);
          }
        };
        const fetch = async (_pickcode) => {
          var _a;
          pickcode.value = _pickcode;
          try {
            const res = await Drive115Instance.VodApiGetWebApiFilesHistory({
              fetch: "one",
              pick_code: pickcode.value,
              share_id: "0",
              category: "1"
            });
            if (!Number.isNaN(res.data.time)) {
              (_a = xplayerRef.value) == null ? void 0 : _a.seekTo(res.data.time);
            }
          } finally {
            isinit.value = true;
          }
        };
        const clear = () => {
          pickcode.value = "";
          isinit.value = false;
        };
        onUnmounted(() => {
          isinit.value = false;
        });
        return {
          handleUpdateCurrentTime,
          fetch,
          clear
        };
      };
      const useDataMovieInfo = () => {
        const javDB = new JavDB();
        const javBus = new JavBus();
        const javDBState = useAsyncState(
          async (avNumber) => {
            if (!avNumber) {
              return null;
            }
            const res = await javDB.getInfo(avNumber);
            return res;
          },
          undefined,
          {
            immediate: false
          }
        );
        const javBusState = useAsyncState(
          async (avNumber) => {
            if (!avNumber) {
              return null;
            }
            return javBus.getInfo(avNumber);
          },
          undefined,
          {
            immediate: false
          }
        );
        const movieInfo = computed(() => {
          return {
            javDBState,
            javBusState
          };
        });
        return movieInfo;
      };
      const useDataPlaylist = () => {
        const playlist = useAsyncState(
          async (cid, pickcode) => {
            const res = await Drive115Instance.getPlaylist(cid, pickcode);
            return res;
          },
          [],
          {
            immediate: false
          }
        );
        return reactive(playlist);
      };
      const usePreferences = () => {
        const preferences = useStorage("x-player-preferences", {
          volume: 100,
          muted: true,
          playbackRate: 1,
          theatre: false,
          autoLoadThumbnails: true,
          superAutoBuffer: false
        });
        return preferences;
      };
      const convertSrtToVtt = (srt) => {
        let vtt = "WEBVTT\n\n";
        const blocks = srt.split(/\n\s*\n/);
        blocks.forEach((block) => {
          if (!block.trim()) return;
          const lines = block.trim().split("\n");
          if (lines.length < 2) return;
          let timeCodeIndex = 0;
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].match(
              /^\d{2}:\d{2}:\d{2}[,\.]\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}[,\.]\d{3}$/
            )) {
              timeCodeIndex = i;
              break;
            }
          }
          if (timeCodeIndex === 0 && !lines[0].match(
            /^\d{2}:\d{2}:\d{2}[,\.]\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}[,\.]\d{3}$/
          )) {
            timeCodeIndex = 1;
          }
          if (timeCodeIndex >= lines.length) return;
          const vttTimecode = lines[timeCodeIndex].replace(/,/g, ".");
          const text = lines.slice(timeCodeIndex + 1).join("\n");
          if (text.trim()) {
            vtt += `${vttTimecode}
${text}

`;
          }
        });
        return vtt;
      };
      const vttToBlobUrl = (vtt) => {
        const blob = new Blob([vtt], { type: "text/vtt; charset=utf-8" });
        return URL.createObjectURL(blob);
      };
      class SubtitleCat {
        constructor() {
          this.domain = "https://subtitlecat.com";
          this.logger = new AppLogger("Utils SubtitleCat");
          this.iRequest = GMRequestInstance;
        }
        getSubtitleText(url) {
          return new Promise((resolve, reject) => {
            this.iRequest.get(url).then((response) => {
              resolve(response.text());
            }).catch((error) => {
              reject(error);
            });
          });
        }
        fetchSubtitleUrl(url, language) {
          return new Promise((resolve, reject) => {
            this.iRequest.get(url).then(async (response) => {
              var _a;
              const parser = new DOMParser();
              const doc = parser.parseFromString(
                await response.text(),
                "text/html"
              );
              const subtitleUrl = (_a = doc.querySelector(`#download_${language}`)) == null ? undefined : _a.getAttribute("href");
              resolve(subtitleUrl || undefined);
            }).catch((error) => {
              reject(error);
            });
          });
        }
        parseSubtitleRow(row, language) {
          var _a, _b;
          const firstTd = row.querySelector("td:first-child");
          const link = firstTd == null ? undefined : firstTd.querySelector("a");
          const title = (link == null ? undefined : link.textContent) || "";
          const href = (link == null ? undefined : link.getAttribute("href")) || "";
          const langMatch = (_a = firstTd == null ? undefined : firstTd.textContent) == null ? undefined : _a.match(/translated from (\w+)/);
          const originLanguage = langMatch ? langMatch[1] : "";
          const hasThumbsDown = row.querySelector("td:nth-child(2) .fa-thumbs-down") !== null;
          const hasThumbsUp = row.querySelector("td:nth-child(2) .fa-thumbs-up") !== null;
          const comment = hasThumbsDown ? -1 : hasThumbsUp ? 1 : 0;
          const downloadsText = ((_b = row.querySelector("td:nth-child(3)")) == null ? undefined : _b.textContent) || "";
          const downloadsMatch = downloadsText.match(/\d+/);
          const downloads = downloadsMatch ? parseInt(downloadsMatch[0]) : 0;
          return {
            title,
            href,
            downloads,
            comment,
            originLanguage,
            targetLanguage: language
          };
        }
        async processSubtitleItem(item) {
          const url = await this.fetchSubtitleUrl(
            `${this.domain}/${item.href}`,
            item.targetLanguage
          );
          if (!url) return undefined;
          const subtitleText = await this.getSubtitleText(this.domain + url);
          const vttText = convertSrtToVtt(subtitleText);
          const blobUrl = vttToBlobUrl(vttText);
          return {
            ...item,
            id: md5(JSON.stringify(item)),
            url: blobUrl,
            vvtText: vttText,
            isCache: false
          };
        }
        sortResults(results) {
          return results.sort((a, b) => {
            if (b.comment !== a.comment) {
              return b.comment - a.comment;
            }
            return b.downloads - a.downloads;
          });
        }
        async fetchSubtitle(keyword, language) {
          const cachedSubtitles = await subtitleCache.getCache(keyword, language);
          if (cachedSubtitles) {
            this.logger.log("从缓存获取字幕成功");
            return cachedSubtitles.map((subtitle) => ({
              ...subtitle,
              url: vttToBlobUrl(subtitle.vvtText)
            }));
          }
          return new Promise((resolve, reject) => {
            this.iRequest.get(`${this.domain}/index.php?search=${keyword}`).then(async (response) => {
              try {
                const parser = new DOMParser();
                const doc = parser.parseFromString(
                  await response.text(),
                  "text/html"
                );
                const rows = Array.from(
                  doc.querySelectorAll(".sub-table tbody tr")
                ).slice(0, 5);
                this.logger.log("fetchSubtitle", `找到${rows.length}个疑似结果`);
                const searchResults = rows.map((row) => this.parseSubtitleRow(row, language)).filter((item) => {
                  const match = item.title.toLowerCase().includes(keyword.toLowerCase());
                  this.logger.log(
                    "fetchSubtitle",
                    `${item.title} ${match ? "匹配" : "不匹配"}`
                  );
                  return match;
                });
                const processedResults = await Promise.all(
                  searchResults.map(async (item) => {
                    const result = await this.processSubtitleItem(item);
                    this.logger.log(
                      `转换字幕 ${item.title}`,
                      result ? "成功" : "失败"
                    );
                    return result;
                  })
                );
                const finalResults = this.sortResults(
                  processedResults.filter(
                    (item) => item !== void 0
                  )
                );
                if (finalResults.length > 0) {
                  await subtitleCache.addCache(
                    keyword,
                    language,
                    finalResults.map((i) => ({
                      ...i,
                      isCache: true
                    }))
                  );
                }
                this.logger.log("最终结果", finalResults);
                resolve(finalResults);
              } catch (error) {
                console.error("处理过程中出错:", error);
                reject(error);
              }
            }).catch((error) => {
              console.error("请求失败:", error);
              reject(error);
            });
          });
        }
      }
      const subtitlecat = new SubtitleCat();
      const useDataSubtitles = () => {
        const subtitles = useAsyncState(
          async (pickcode, keyword) => {
            if (!keyword) {
              return [];
            }
            const ResSubtitles = await subtitlecat.fetchSubtitle(keyword, "zh-CN");
            const preference = await subtitlePreference.getPreference(pickcode);
            return ResSubtitles.map((subtitle) => ({
              id: subtitle.id,
              url: subtitle.url,
              label: subtitle.title,
              srclang: subtitle.targetLanguage,
              kind: "subtitles",
              default: preference ? preference.id === subtitle.id : false
            }));
          },
          [],
          {
            immediate: false
          }
        );
        return subtitles;
      };
      const ERROR_QUEUE_CLEARED = "Queue cleared";
      class Scheduler {
        constructor(options = {}) {
          this.queue = [];
          this.running = /* @__PURE__ */ new Map();
          this.laneRunningCount = /* @__PURE__ */ new Map();
          this.options = {
            maxConcurrent: 3,
            maxQueueLength: 100,
            defaultRetryDelay: 1e3,
            laneConfig: {}
          };
          this.options = {
            ...this.options,
            ...options
          };
          Object.keys(this.options.laneConfig).forEach((laneName) => {
            this.laneRunningCount.set(laneName, 0);
          });
        }
        /**
         * 添加任务到队列
         */
        async add(execute, options = {}) {
          var _a;
          if (this.queue.length >= this.options.maxQueueLength) {
            throw new Error("队列已满");
          }
          if (options.id && this.get(options.id)) {
            throw new Error(
              `任务已存在: ${options.id} ${(_a = this.get(options.id)) == null ? undefined : _a.status}`
            );
          }
          let resolve = undefined;
          let reject = undefined;
          const promise = new Promise((_resolve, _reject) => {
            resolve = _resolve;
            reject = _reject;
          });
          const task = {
            execute,
            promise,
            priority: options.priority || 0,
            resolve,
            reject,
            timeout: options.timeout,
            retries: options.retries || 0,
            id: options.id || Math.random().toString(36).substr(2, 9),
            lane: options.lane,
            status: "pending",
            immediate: options.immediate,
            action: options.action
          };
          if (task.lane && this.isPaused(task.lane)) {
            task.status = "paused";
          }
          if (task.action === "push") {
            this.queue.push(task);
          } else {
            this.queue.unshift(task);
          }
          this.sort();
          if (task.immediate) {
            this.processQueue();
          }
          return task.promise;
        }
        sort() {
          this.queue.sort((a, b) => {
            var _a, _b;
            const aLanePriority = a.lane ? ((_a = this.options.laneConfig[a.lane]) == null ? undefined : _a.priority) || 0 : 0;
            const bLanePriority = b.lane ? ((_b = this.options.laneConfig[b.lane]) == null ? undefined : _b.priority) || 0 : 0;
            if (aLanePriority !== bLanePriority) {
              return aLanePriority - bLanePriority;
            }
            return a.priority - b.priority;
          });
        }
        /**
         * 暂停全部或指定任务或任务车道
         */
        pause(idOrLane) {
          this.running.forEach((task) => {
            if (!idOrLane || task.id === idOrLane || task.lane === idOrLane) {
              task.status = "paused";
            }
          });
          this.queue.forEach((task) => {
            if (!idOrLane || task.id === idOrLane || task.lane === idOrLane) {
              task.status = "paused";
            }
          });
        }
        /**
         * 恢复全部或指定任务或任务车道
         */
        resume(idOrLane) {
          this.queue.forEach((task) => {
            if ((!idOrLane || task.id === idOrLane || task.lane === idOrLane) && task.status === "paused") {
              task.status = "pending";
            }
          });
          this.sort();
          this.processQueue();
        }
        /**
         * 取消指定任务或任务车道
         */
        cancel(idOrLane) {
          this.queue = this.queue.filter((task) => {
            if (task.id === idOrLane || task.lane === idOrLane) {
              task.status = "cancelled";
              task.reject(new Error("Task cancelled"));
              return false;
            }
            return true;
          });
          this.running.forEach((task, taskId) => {
            if (task.id === idOrLane || task.lane === idOrLane) {
              task.status = "cancelled";
              task.reject(new Error("Task cancelled"));
              this.running.delete(taskId);
              if (task.lane) {
                this.decrementLaneRunningCount(task.lane);
              }
            }
          });
        }
        /**
         * 重试指定任务或任务车道
         */
        retry(idOrLane, retries) {
          const tasksToRetry = [];
          this.queue.forEach((task) => {
            if ((task.id === idOrLane || task.lane === idOrLane) && task.status === "failed") {
              task.retries = retries ?? task.retries;
              task.status = "pending";
              tasksToRetry.push(task);
            }
          });
          tasksToRetry.forEach((task) => {
            this.queue.push(task);
          });
          this.processQueue();
        }
        isPaused(idOrLane) {
          return Boolean(
            this.queue.some(
              (task) => task.lane === idOrLane && task.status === "paused"
              /* Paused */
            )
          );
        }
        /**
         * 增加车道运行计数
         */
        incrementLaneRunningCount(lane) {
          const currentCount = this.laneRunningCount.get(lane) || 0;
          this.laneRunningCount.set(lane, currentCount + 1);
        }
        /**
         * 减少车道运行计数
         */
        decrementLaneRunningCount(lane) {
          const currentCount = this.laneRunningCount.get(lane) || 0;
          if (currentCount > 0) {
            this.laneRunningCount.set(lane, currentCount - 1);
          }
        }
        /**
         * 获取车道当前运行任务数
         */
        getLaneRunningCount(lane) {
          return this.laneRunningCount.get(lane) || 0;
        }
        /**
         * 检查车道是否可以运行更多任务
         */
        canLaneRunMoreTasks(lane) {
          const laneConfig = this.options.laneConfig[lane];
          if (!laneConfig) return true;
          const currentCount = this.getLaneRunningCount(lane);
          return currentCount < laneConfig.maxConcurrent;
        }
        /**
         * 处理队列
         */
        async processQueue() {
          if (this.running.size >= this.options.maxConcurrent) {
            return;
          }
          const nextTask = this.queue.find((task) => {
            if (task.status !== "pending" || this.isPaused(task.id)) {
              return false;
            }
            if (task.lane && !this.canLaneRunMoreTasks(task.lane)) {
              return false;
            }
            return true;
          });
          if (!nextTask) return;
          this.queue = this.queue.filter((task) => task !== nextTask);
          this.running.set(nextTask.id, nextTask);
          nextTask.status = "running";
          if (nextTask.lane) {
            this.incrementLaneRunningCount(nextTask.lane);
          }
          try {
            let timeoutId;
            const executeWithTimeout = async () => {
              if (nextTask.timeout) {
                const timeoutPromise = new Promise((_, reject) => {
                  timeoutId = window.setTimeout(() => {
                    console.warn("Task timeout", nextTask.id);
                    reject(new Error("Task timeout"));
                  }, nextTask.timeout);
                });
                return Promise.race([nextTask.execute(), timeoutPromise]);
              }
              return nextTask.execute();
            };
            const result = await this.executeWithRetry(
              executeWithTimeout,
              nextTask.retries || 0,
              nextTask
            );
            if (timeoutId) clearTimeout(timeoutId);
            nextTask.status = "completed";
            nextTask.resolve(result);
          } catch (error) {
            nextTask.status = "failed";
            nextTask.reject(error);
          } finally {
            this.running.delete(nextTask.id);
            if (nextTask.lane) {
              this.decrementLaneRunningCount(nextTask.lane);
            }
            this.processQueue();
          }
        }
        /**
         * 带重试的执行
         */
        async executeWithRetry(fn, retriesLeft, task) {
          try {
            return await fn();
          } catch (error) {
            if (retriesLeft > 0 && task.status !== "cancelled") {
              console.warn("Task retry", task.id);
              await new Promise(
                (resolve) => setTimeout(resolve, this.options.defaultRetryDelay)
              );
              return this.executeWithRetry(fn, retriesLeft - 1, task);
            }
            throw error;
          }
        }
        /**
         * 获取队列状态
         */
        getStatus() {
          const laneStatus = {};
          this.laneRunningCount.forEach((count, lane) => {
            var _a;
            laneStatus[lane] = {
              running: count,
              maxConcurrent: ((_a = this.options.laneConfig[lane]) == null ? undefined : _a.maxConcurrent) || 0
            };
          });
          return {
            queueLength: this.queue.length,
            runningCount: this.running.size,
            maxConcurrent: this.options.maxConcurrent,
            lanes: laneStatus,
            tasks: {
              pending: this.queue.filter((t) => t.status === "pending").length,
              running: this.running.size,
              paused: this.queue.filter((t) => t.status === "paused").length,
              failed: this.queue.filter((t) => t.status === "failed").length,
              completed: this.queue.filter((t) => t.status === "completed").length,
              cancelled: this.queue.filter((t) => t.status === "cancelled").length
            }
          };
        }
        /**
         * 获取任务
         */
        get(idOrLane) {
          return this.queue.find((t) => t.id === idOrLane || t.lane === idOrLane) ?? this.running.get(idOrLane);
        }
        /**
         * 是否有正在运行的任务
         */
        hasRunning() {
          return this.running.size > 0;
        }
        /**
         * 获取车道的运行状态
         */
        getLaneStatus(lane) {
          const laneConfig = this.options.laneConfig[lane];
          const runningCount = this.getLaneRunningCount(lane);
          return {
            name: lane,
            running: runningCount,
            maxConcurrent: (laneConfig == null ? undefined : laneConfig.maxConcurrent) || 0,
            priority: (laneConfig == null ? undefined : laneConfig.priority) || 0,
            hasConfig: !!laneConfig
          };
        }
        /**
         * 尝试抢占车道
         */
        tryOvertaking(id, lane, priority) {
          const task = this.get(id);
          if (!task) return false;
          if (task.status === "pending" || task.status === "running" || task.status === "paused") {
            task.lane = lane;
            task.priority = priority ?? task.priority;
            this.sort();
            this.processQueue();
            return true;
          }
          return false;
        }
        /**
         *  尝试恢复任务
         */
        tryResume(id) {
          const task = this.get(id);
          if (!task) return false;
          if (task.status === "paused") {
            this.resume(id);
            return true;
          }
          return false;
        }
        /**
         * 设置车道配置
         */
        setLaneConfig(lane, config) {
          const currentConfig = this.options.laneConfig[lane] || {
            name: lane,
            priority: 0,
            maxConcurrent: this.options.maxConcurrent
          };
          this.options.laneConfig[lane] = {
            ...currentConfig,
            ...config
          };
          if (!this.laneRunningCount.has(lane)) {
            this.laneRunningCount.set(lane, 0);
          }
          this.sort();
          this.processQueue();
        }
        /**
         * 等待队列空闲
         */
        async waitIdle(time = 100) {
          if (!this.hasRunning()) {
            return;
          }
          await new Promise((resolve) => setTimeout(resolve, time));
          await this.waitIdle();
        }
        /**
         * 等待特定车道空闲
         */
        async waitLaneIdle(lane, time = 100) {
          if (this.getLaneRunningCount(lane) === 0) {
            return;
          }
          await new Promise((resolve) => setTimeout(resolve, time));
          await this.waitLaneIdle(lane, time);
        }
        /**
         * 清空队列
         */
        clear() {
          this.queue.forEach((task) => {
            task.status = "cancelled";
            task.reject(new Error(ERROR_QUEUE_CLEARED));
          });
          this.queue = [];
          this.running.clear();
          this.laneRunningCount.clear();
          Object.keys(this.options.laneConfig).forEach((laneName) => {
            this.laneRunningCount.set(laneName, 0);
          });
        }
        get length() {
          return this.queue.length;
        }
        get runningCount() {
          return this.running.size;
        }
      }
      const CLIPPER_OPTIONS = {
        maxWidth: 320,
        maxHeight: 180
      };
      const LANE_CONFIG = {
        must: {
          name: "must",
          priority: 1,
          maxConcurrent: 5
        },
        buffer: {
          name: "buffer",
          priority: 2,
          maxConcurrent: 5
        }
      };
      const SCHEDULER_OPTIONS = {
        maxConcurrent: 5,
        maxQueueLength: 500,
        laneConfig: LANE_CONFIG
      };
      const BLUR = 30;
      function useDataThumbnails(preferences) {
        const clipper = new M3U8Clipper(CLIPPER_OPTIONS);
        const scheduler = new Scheduler(SCHEDULER_OPTIONS);
        let isInited = false;
        const initialize = async (sources) => {
          isInited = false;
          clipper.clear();
          const source = findLowestQualityHLS(sources);
          if (!source) return;
          await clipper.init(source.url, BLUR);
          await autoBuffer();
          isInited = true;
        };
        const findLowestQualityHLS = (sources) => {
          let lowestQuality = null;
          sources.forEach((source) => {
            if (source.type === "hls") {
              if (!lowestQuality || source.quality < lowestQuality.quality) {
                lowestQuality = source;
              }
            }
          });
          return lowestQuality;
        };
        const onMThumbnailRequestMust = useThrottleFn(
          async (time, isLast) => {
            if (!isInited || Number.isNaN(time)) {
              return null;
            }
            const segment = clipper.findSegmentByTime(time);
            const id = (segment == null ? undefined : segment._uri) ?? "";
            if (!id) {
              throw new Error("segment is not null");
            }
            const lane = isLast ? LANE_CONFIG.must : LANE_CONFIG.buffer;
            let promise;
            const task = scheduler.get(id);
            if (task && isLast && scheduler.tryOvertaking(id, LANE_CONFIG.must.name)) {
              promise = task.promise;
            } else if (task) {
              promise = task.promise;
            } else {
              promise = scheduler.add(
                async () => {
                  const clipImage = await clipper.getClip(time);
                  return (clipImage == null ? undefined : clipImage.img) ?? null;
                },
                {
                  id,
                  lane: lane.name,
                  priority: 0,
                  immediate: true,
                  action: "unshift"
                }
              );
            }
            return await promise.catch((error) => {
              if (error instanceof Error && error.message !== ERROR_QUEUE_CLEARED) {
                throw error;
              }
              return null;
            });
          },
          125,
          true,
          false
        );
        const onThumbnailRequest = async ({
          type,
          time,
          isLast
        }) => {
          if (!isInited || Number.isNaN(time)) {
            return null;
          }
          const _blurTime = clipper.blurTime(time);
          if (type === "Cache") {
            const clipImage = clipper.getClipByCache(_blurTime);
            return (clipImage == null ? undefined : clipImage.img) ?? null;
          }
          return onMThumbnailRequestMust(_blurTime, isLast);
        };
        const autoBuffer = async () => {
          if (preferences.value.autoLoadThumbnails === false) {
            return;
          }
          const isSuperBuffer = preferences.value.superAutoBuffer === true;
          const blurSegments = sampleSize(
            clipper.blurSegments,
            Math.max(
              Math.min(clipper.blurSegments.length, 50),
              clipper.blurSegments.length / (isSuperBuffer ? 1 : 3)
            )
          );
          if (!blurSegments.length) {
            throw new Error("blurSegments is not null");
          }
          for (const segment of blurSegments) {
            const id = segment._uri ?? "";
            if (scheduler.get(id)) {
              continue;
            }
            scheduler.add(
              async () => {
                const clipImage = await clipper.getClip(segment._startTime);
                return (clipImage == null ? undefined : clipImage.img) ?? null;
              },
              {
                id,
                lane: LANE_CONFIG.buffer.name,
                priority: 1,
                immediate: true,
                action: "unshift"
              }
            ).catch((error) => {
              if (error instanceof Error && error.message !== ERROR_QUEUE_CLEARED) {
                throw error;
              }
            });
          }
        };
        const clear = () => {
          clipper.clear();
          scheduler.clear();
        };
        tryOnUnmounted(() => {
          clear();
        });
        return {
          initialize,
          onThumbnailRequest,
          clear
        };
      }
      const useDataVideoSources = () => {
        const list = ref([]);
        const fetch = async (pickCode) => {
          const [download, m3u8List] = await Promise.allSettled([
            Drive115Instance.getFileDownloadUrl(pickCode),
            Drive115Instance.getM3u8(pickCode)
          ]);
          if (download.status === "fulfilled") {
            if (download.value.url.auth_cookie) {
              console.log("设置cookie", download.value.url.auth_cookie);
              try {
                await setVideoCookie({
                  name: download.value.url.auth_cookie.name,
                  value: download.value.url.auth_cookie.value,
                  path: "/",
                  domain: ".115cdn.net",
                  secure: true,
                  expirationDate: Number(download.value.url.auth_cookie.expire),
                  sameSite: "no_restriction"
                });
              } catch (error) {
                alert("设置cookie失败");
                throw error;
              }
            }
            list.value.unshift({
              name: "Ultra原画",
              url: download.value.url.url,
              type: "auto",
              quality: 99999,
              displayQuality: "Ultra原画"
            });
          }
          if (m3u8List.status === "fulfilled") {
            list.value.push(
              ...m3u8List.value.map((item) => ({
                name: `${item.quality}P`,
                url: item.url,
                type: "hls",
                quality: item.quality,
                displayQuality: qualityNumMap[item.quality]
              }))
            );
          } else {
            console.log("m3u8", m3u8List.reason);
          }
        };
        const clear = () => {
          list.value = [];
        };
        return {
          list,
          fetch,
          clear
        };
      };
      const _hoisted_1 = { class: "page-body" };
      const _hoisted_2 = { class: "page-main" };
      const _hoisted_3 = { class: "page-flow" };
      const _hoisted_4 = { class: "local-player" };
      const _hoisted_5 = { class: "page-footer" };
      const _hoisted_6 = { class: "page-sider" };
      const _sfc_main = /* @__PURE__ */ defineComponent({
        __name: "index",
        setup(__props) {
          const xplayerRef = ref();
          const preferences = usePreferences();
          const params = useParamsVideoPage();
          const DataVideoSources = useDataVideoSources();
          const DataThumbnails = useDataThumbnails(preferences);
          const DataSubtitles = useDataSubtitles();
          const DataMovieInfo = useDataMovieInfo();
          const DataFileInfo = useDataFileInfo();
          const DataPlaylist = useDataPlaylist();
          const DataHistory = useDataHistory(xplayerRef);
          const handleSubtitleChange = async (subtitle) => {
            await subtitlePreference.savePreference(
              params.pickCode.value,
              subtitle || null
            );
          };
          const handleLocalPlay = async (player) => {
            var _a;
            const download = await Drive115Instance.getFileDownloadUrl(params.pickCode.value);
            switch (player) {
              case "mpv":
                open(webLinkShortcutsMpv(download));
                break;
              case "iina":
                (_a = xplayerRef.value) == null ? undefined : _a.interruptSource();
                setTimeout(() => {
                  open(webLinkIINA(download));
                }, 300);
                break;
            }
          };
          useTitle(params.title.value || "");
          const handlePlay = async (item) => {
            goToPlayer({
              cid: params.cid.value,
              pickCode: item.pc,
              title: item.n,
              size: item.s,
              avNumber: getAvNumber(item.n)
            });
            params.getParams();
            DataVideoSources.clear();
            DataThumbnails.clear();
            DataHistory.clear();
            DataSubtitles.execute(0, params.pickCode.value, null);
            DataMovieInfo.value.javDBState.execute(0, null);
            DataMovieInfo.value.javBusState.execute(0, null);
            await nextTick();
            await loadData(false);
          };
          const loadData = async (isFirst = true) => {
            await DataVideoSources.fetch(params.pickCode.value);
            try {
              await DataHistory.fetch(params.pickCode.value);
            } catch (error) {
              console.error(error);
            }
            await Drive115Instance.fakeVodAuthPickcode(params.pickCode.value);
            DataFileInfo.execute(0, params.pickCode.value);
            isFirst && DataPlaylist.execute(0, params.cid.value, params.pickCode.value);
            DataThumbnails.initialize(DataVideoSources.list.value);
            if (params.avNumber.value) {
              DataMovieInfo.value.javDBState.execute(0, params.avNumber.value);
              DataMovieInfo.value.javBusState.execute(0, params.avNumber.value);
              DataSubtitles.execute(0, params.pickCode.value, params.avNumber.value);
            }
          };
          useTitle(params.title.value || "");
          onMounted(async () => {
            await loadData();
          });
          return (_ctx, _cache) => {
            return openBlock(), createElementBlock("div", {
              class: normalizeClass(["page-container", { "is-theatre": unref(preferences).theatre }])
            }, [
              createElementVNode("div", _hoisted_1, [
                createElementVNode("div", _hoisted_2, [
                  createVNode(XPlayer, {
                    ref_key: "xplayerRef",
                    ref: xplayerRef,
                    class: "video-player",
                    theatre: unref(preferences).theatre,
                    "onUpdate:theatre": _cache[0] || (_cache[0] = ($event) => unref(preferences).theatre = $event),
                    volume: unref(preferences).volume,
                    "onUpdate:volume": _cache[1] || (_cache[1] = ($event) => unref(preferences).volume = $event),
                    muted: unref(preferences).muted,
                    "onUpdate:muted": _cache[2] || (_cache[2] = ($event) => unref(preferences).muted = $event),
                    playbackRate: unref(preferences).playbackRate,
                    "onUpdate:playbackRate": _cache[3] || (_cache[3] = ($event) => unref(preferences).playbackRate = $event),
                    sources: unref(DataVideoSources).list,
                    subtitles: unref(DataSubtitles).state,
                    subtitlesLoading: unref(DataSubtitles).isLoading,
                    subtitlesReady: unref(DataSubtitles).isReady,
                    preferences: unref(preferences),
                    onThumbnailRequest: unref(DataThumbnails).onThumbnailRequest,
                    onSubtitleChange: handleSubtitleChange,
                    onUpdateCurrentTime: unref(DataHistory).handleUpdateCurrentTime
                  }, null, 8, ["theatre", "volume", "muted", "playbackRate", "sources", "subtitles", "subtitlesLoading", "subtitlesReady", "preferences", "onThumbnailRequest", "onUpdateCurrentTime"]),
                  createElementVNode("div", _hoisted_3, [
                    createVNode(FileInfo, { fileInfo: unref(DataFileInfo) }, null, 8, ["fileInfo"]),
                    createElementVNode("div", _hoisted_4, [
                      unref(isMac) ? (openBlock(), createElementBlock("button", {
                        key: 0,
                        class: "page-local-play",
                        onClick: _cache[4] || (_cache[4] = ($event) => handleLocalPlay("iina"))
                      }, "IINA Beta")) : createCommentVNode("", true)
                    ]),
                    createVNode(MovieInfo, { movieInfos: unref(DataMovieInfo) }, null, 8, ["movieInfos"]),
                    createElementVNode("div", _hoisted_5, [
                      createVNode(Footer)
                    ])
                  ])
                ]),
                createElementVNode("div", _hoisted_6, [
                  createVNode(Playlist, {
                    class: "page-sider-playlist",
                    pickCode: unref(params).pickCode.value,
                    playlist: unref(DataPlaylist),
                    onPlay: handlePlay
                  }, null, 8, ["pickCode", "playlist"])
                ])
              ])
            ], 2);
          };
        }
      });
      const index = exports("default", /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-62c2e553"]]));

    })
  };
}));

System.import("./__entry.js", "./");