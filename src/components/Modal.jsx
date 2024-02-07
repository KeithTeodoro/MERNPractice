import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
const Modal = forwardRef(function Modal({ onAdd }, ref) {
  const dialog = useRef();
  const username = useRef();
  const tag = useRef();
  const content = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        username.current.value = "";
        tag.current.value = "";
        content.current.value = "";
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      },
    };
  });

  const handleAddData = () => {
    const idea = {
      username: username.current.value,
      tag: tag.current.value,
      text: content.current.value,
    };

    onAdd(idea);
    dialog.current.close();
  };

  return createPortal(
    <dialog ref={dialog}>
      <div className="flex flex-col gap-5 p-5">
        <input
          type="text"
          placeholder="username"
          className="border-solid border-2 border-green-300"
          ref={username}
        />
        <input
          type="text"
          placeholder="tag"
          className="border-solid border-2 border-green-300"
          ref={tag}
        />
        <input
          type="text"
          placeholder="content"
          className="border-solid border-2 border-green-300"
          ref={content}
        />
        <button className="bg-green-50" onClick={handleAddData}>
          Add data
        </button>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
