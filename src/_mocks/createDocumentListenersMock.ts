// used to test useClickOutside hook w/i components
export const createDocumentListenersMock = () => {
    const listeners = {};
    const handler = (domEl, event) => listeners?.[event]?.({ target: domEl });
    document.addEventListener = jest.fn((event, cb) => {
        listeners[event] = cb;
    });

    document.removeEventListener = jest.fn((event) => {
        delete listeners[event];
    });

    return {
        mouseDown: (domEl) => handler(domEl, "mousedown"),
        click: (domEl) => handler(domEl, "click"),
    };
};
