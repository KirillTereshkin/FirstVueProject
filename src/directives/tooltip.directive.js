export default {
  bind(el, { value }) {
    M.Tooltip.init(el, {
      html: value.html,
      position: value.position || 'bottom'
    });
  },
  unbind(el) {
    const tooltip = M.Tooltip.getInstance(el);
    if(tooltip && tooltip.destroy) tooltip.destroy();
  }
};
