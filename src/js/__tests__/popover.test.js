/**
 * @jest-environment jsdom
 */

import { PopoverWidget } from '../index.js';

describe('Popover Widget Clean DOM Interaction', () => {
    let button;
    let widget;

    beforeEach(() => {
        // Имитируем чистый DOM, в котором есть только кнопка
        document.body.innerHTML = `
            <div class="wrapper" style="margin-top: 200px;">
                <button id="popover-btn">Click to toggle popover</button>
            </div>
        `;

        button = document.getElementById('popover-btn');
        
        // ИСПРАВЛЕНО: Передаем 3 аргумента (id, заголовок, текст)
        widget = new PopoverWidget(
            'popover-btn', 
            'Popover title', 
            "And here's some amazing content."
        );
    });

    afterEach(() => {
        if (widget) {
            widget.destroy();
        }
        document.body.innerHTML = '';
    });

    test('should NOT contain popover hint in DOM on initialization', () => {
        const hint = document.querySelector('.popover-hint');
        expect(hint).toBeNull();
    });

    test('should create popover hint element in DOM on button click', () => {
        button.click();

        const hint = document.querySelector('.popover-hint');
        expect(hint).not.toBeNull();
        
        // Проверяем, что в созданном поповере есть наш текст
        expect(hint.textContent).toContain("And here's some amazing content");
        // При желании можно проверить наличие заголовка:
        expect(hint.textContent).toContain("Popover title");
    });

    test('should remove popover hint from DOM on second click', () => {
        button.click(); // Открыли поповер
        let hint = document.querySelector('.popover-hint');
        expect(hint).not.toBeNull();

        button.click(); // Закрыли поповер
        hint = document.querySelector('.popover-hint');
        expect(hint).toBeNull();
    });
});