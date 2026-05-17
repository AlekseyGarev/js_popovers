/**
 * @jest-environment jsdom
 */

import { PopoverWidget } from '../index.js';

describe('Popover Widget DOM Interaction (JSDOM)', () => {
    let button;
    let staticField;
    let widget;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="wrapper">
                <div class="static-field" style="width: 270px; height: 40px;">Popover title</div>
                <button id="popover-btn">Click to toggle popover</button>
            </div>
        `;

        button = document.getElementById('popover-btn');
        staticField = document.querySelector('.static-field');
        
        widget = new PopoverWidget('popover-btn', "And here's some amazing content.");
    });

    afterEach(() => {
        if (widget) {
            widget.destroy();
        }
        document.body.innerHTML = '';
    });

    test('Проверяем, что изначально подсказки на странице нет', () => {
        const hint = document.querySelector('.popover-hint');
        expect(hint).toBeNull();
    });

    test(' всплывающий элемент подсказки в DOM при нажатии кнопки', () => {
        button.click();

        const hint = document.querySelector('.popover-hint');
        expect(hint).not.toBeNull();
        
        expect(hint.textContent).toContain("And here's some amazing content");
    });

    test('удалить всплывающую подсказку из DOM при втором щелчке мыши', () => {
        button.click();
        let hint = document.querySelector('.popover-hint');
        expect(hint).not.toBeNull();

        
        button.click();
        hint = document.querySelector('.popover-hint');
        
        
        expect(hint).toBeNull();
    });
});