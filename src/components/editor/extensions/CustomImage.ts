// import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { Node, mergeAttributes } from "@tiptap/core";

export const CustomImage = Node.create({
  name: "customImage",
  group: "inline",
  inline: true,
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      src: {},
      alt: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: "img[src]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ({ node, editor, getPos }) => {
      const dom = document.createElement("span");
      dom.style.position = "relative";

      const img = document.createElement("img");
      img.src = node.attrs.src;
      img.alt = node.attrs.alt || "";
      img.style.maxWidth = "20%";
      img.style.maxHeight = "20%";
      img.style.display = "block";

      const button = document.createElement("button");
      button.textContent = "✕";
      Object.assign(button.style, {
        position: "absolute",
        top: "0",
        right: "0",
        background: "black",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "20px",
        height: "20px",
        cursor: "pointer",
        fontSize: "12px",
        transform: "translate(50%, -50%)",
      });

      button.onclick = (e) => {
        e.stopPropagation();
        const pos = getPos();
        if (typeof pos === "number") {
          editor
            .chain()
            .focus()
            .deleteRange({ from: pos, to: pos + node.nodeSize })
            .run();
        }
      };

      dom.appendChild(img);
      dom.appendChild(button);

      return {
        dom,
      };
    };
  },
});
