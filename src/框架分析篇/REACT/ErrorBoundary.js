/**
 * try---catch 会导致 控制台面板 Pause on exceptions 失效。
 */

// v1 用 onerror

function wrapperDev(func) {
  function handlerWindowError(error) {
    // 交给 Error Boundary 处理
  }
  window.addEventListener("error", handlerWindowError);
  func(); // 运行业务函数。如果抛出了异常。将不再继续执行
  window.removeEventListener("error", handlerWindowError);
}

// v2

function wrapperDev(func) {
  function handlerWindowError(error) {
    // 收集错误交给 ErrorBoundary 处理
  }
  function callCallback() {
    fakeNode.removeEventListener(evtType, callCallback, false);
    func();
  }
  const event = document.createEvent("Event");
  const fakeNode = document.createElement("fake");
  const evtType = "fake-event";

  window.addEventListener("error", handlerWindowError);
  fakeNode.addEventListener(evtType, callCallback, false);

  event.initEvent(evtType, false, false);

  fakeNode.dispatchEvent(evtType);

  window.removeEventListener("error", handlerWindowError);
}
