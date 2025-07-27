define(['jquery'], function($) {
  return function() {
    this.init = function() {
      this.system().events.on('contacts:card.open leads:card.open', function(card) {
        if (!card.phone_fields) return;

        card.phone_fields.forEach(function(field) {
          const raw = field.raw;
          const digits = raw.replace(/\D/g, '');
          let formatted = '';

          if (digits.startsWith('80') && digits.length === 11) {
            formatted = '375' + digits.slice(2);
          } else if (digits.startsWith('375') && digits.length === 12) {
            formatted = digits;
          } else {
            return;
          }

          if (field.node.find('.tg-btn').length) return;

          const btn = $('<button>')
            .addClass('tg-btn')
            .text('Написать в Telegram')
            .css({ marginLeft: '8px' })
            .on('click', function() {
              window.open(`tg://resolve?phone=${formatted}`);
            });

          field.node.append(btn);
        });
      });
    };
  };
});
