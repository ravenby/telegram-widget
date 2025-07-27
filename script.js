define(['jquery'], function($) {
  var CustomWidget = function() {
    var self = this;

    self.system = self.system();
    self.langs = self.langs;

    this.init = function() {
      self.bindEvents();
    };

    this.bindEvents = function() {
      self.system().events.on('contacts:card.open deals:card.open', function(card) {
        card.phone_fields.forEach(function(field) {
          insertTelegramButton(field);
        });
      });
    };

    function formatPhone(phone) {
      let digits = phone.replace(/\D/g,'');
      if(digits.startsWith('80') && digits.length === 11) {
        return '375' + digits.slice(2);
      }
      if(digits.startsWith('375') && digits.length === 12) {
        return digits;
      }
      return null;
    }

    function insertTelegramButton(field) {
      let container = field.node;
      if(container.find('.btn-tg').length) return;

      let raw = field.raw;
      let formatted = formatPhone(raw);
      if(!formatted) return;

      let btn = $('<button>')
        .addClass('btn-tg')
        .text('Написать в Telegram')
        .css({ marginLeft: '8px'})
        .on('click', function(){
          window.open('tg://resolve?phone=' + formatted);
        });
      container.append(btn);
    }
  };

  return CustomWidget;
});
