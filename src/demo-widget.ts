/// <reference types='jquery'/>
/// <reference types='jqueryui'/>

interface IWidget {
  element: JQuery;
  options: any;
  _create(): void;
  _destroy(): void;
  _setOption(key: string, value: any): void;
}

// Implement code logic
// Defined namespace Demo
module Demo {
  // Defined main class widget
  export class DemoWidget implements IWidget {
    public element: JQuery;

    public options: any = {
      senderColor: 'success',
      receiverColor: 'primary'
    }

    public _create(): void {
      this.addMessage('received', 'Hello guy!');
      this.addMessage('send', 'Hi!');
      this.addMessage('received', 'This is demo jQuery widget with Typescript.');
      this.addMessage('send', 'Good boy. Amazing and best pratice.');
      this.addMessage('received', 'Thanks guy.');
      this.bind();
    }

    public _destroy(): void {
      // Do somethings
    }

    public _setOption(key: string, value: any): void {
      if (this.options[key]) {
        this.options[key] = value;
      } else {
        throw new Error('Option does not existed');
      }
    }

    private bind(): void {
      let widget: JQuery = this.element;
      let _this = this;
      $('.btn-send', this.element).click(function (e) {
        e.preventDefault();
        let messageText: string = $('.txt-message', widget).val().toString();
        if (messageText !== '') {
          _this.addMessage('send', messageText);
          $('.txt-message', widget).val('');
        }
      });

      $('.txt-message', this.element).on('keypress', function (e) {
        if (e.which === 13) {
          let messageText: string = $(this).val().toString();
          if (messageText !== '') {
            _this.addMessage('send', messageText);
            $(this).val('');
          }
        }
      });
    }

    private addMessage(messageType: string, messageText: string): void {
      let messageLine: string;
      if (messageType === 'send') {
        messageLine = `<div class="message-item text-right"><span class="badge badge-${this.options.senderColor}">${messageText}</span></div>`;
      } else {
        messageLine = `<div class="message-item text-left"><span class="badge badge-${this.options.receiverColor}">${messageText}</span></div>`;
      }
      $('.messages', this.element).append(messageLine);
    }
  }
}
// ----------------------------------------------------------------------
// Defined type widget with JQuery
$.widget("tnqsoft.demoWidget", new Demo.DemoWidget());
