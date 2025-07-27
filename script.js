define(['jquery'], function($) {
  return function() {
    this.init = function() {
      this.system().events.on('contacts:card.open deals:card.open', function(card) {
        card.phone_fields.forEach(function(field) {
          let raw = field.raw;
          let digits = raw.replace(/\D/g,'');
          if (digits.startsWith('80') && digits.length === 11) {
            digits = '375' + digits.slice(2);
          } else if (digits.startsWith('375') && digits.length === 12) {
            // ok
          } else return;
          if (field.node.find('.btn-tg').length) return;
          const btn = $('<button>')
            .addClass('btn-tg')
            .text('Telegram')
            .css({marginLeft:'8px'})
            .on('click', () => { window.open(`tg://resolve?phone=${digits}`); });
          field.node.append(btn);
        });
      });
    };
  };
});
