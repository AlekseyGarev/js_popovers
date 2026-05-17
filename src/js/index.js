export class PopoverWidget {
    constructor(buttonId, content) {
        this.button = document.getElementById(buttonId);
        this.staticField = document.querySelector('.static-field');
        this.content = content;
        this.hintElement = null;

        if (this.button) {
            this.button.addEventListener('click', () => this.toggle());
            window.addEventListener('resize', () => {
                if (this.hintElement) this.positionHint();
            });
        }
    }

    toggle() {
        if (this.hintElement) {
            this.destroy();
        } else {
            this.create();
        }
    }

    create() {
        const hint = document.createElement('div');
        hint.className = 'popover-hint';
        hint.textContent = this.content; 
    
        document.body.appendChild(hint);
        this.hintElement = hint;
    
        this.positionHint();
    }

    positionHint() {
        const targetElement = this.staticField || this.button;
        const targetCoords = targetElement.getBoundingClientRect();
        
        const left = targetCoords.left + window.pageXOffset;
        
        const top = targetCoords.top + window.pageYOffset + targetCoords.height;

        this.hintElement.style.left = `${left}px`;
        this.hintElement.style.top = `${top}px`;
    }

    destroy() {
        if (this.hintElement) {
            this.hintElement.remove();
            this.hintElement = null;
        }
    }
}

if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        new PopoverWidget('popover-btn', "And here's some amazing content. It's very engaging. Right?");
    });
}