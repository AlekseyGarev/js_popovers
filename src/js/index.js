export class PopoverWidget {
    constructor(buttonId, title, content) {
        this.button = document.getElementById(buttonId);
        this.title = title;
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
        const popover = document.createElement('div');
        popover.className = 'popover-hint';

        const header = document.createElement('h3');
        header.className = 'popover-title';
        header.textContent = this.title;

        const body = document.createElement('div');
        body.className = 'popover-body';
        body.textContent = this.content;

        popover.appendChild(header);
        popover.appendChild(body);
        document.body.appendChild(popover);
        
        this.hintElement = popover;
        this.positionHint();
    }

    positionHint() {
        if (!this.hintElement || !this.button) return;
        const popoverWidth = this.hintElement.offsetWidth || 270;
        const popoverHeight = this.hintElement.offsetHeight || 105;

        const targetCoords = this.button.getBoundingClientRect();
        
        const left = targetCoords.left + window.scrollX + (targetCoords.width / 2) - (popoverWidth / 2);
        
        const top = targetCoords.top + window.scrollY - popoverHeight - 12;

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

function initWidget() {
    if (document.getElementById('popover-btn')) {
        new PopoverWidget(
            'popover-btn', 
            'Popover title',
            "And here's some amazing content. It's very engaging. Right?"
        );
    }
}

if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
}