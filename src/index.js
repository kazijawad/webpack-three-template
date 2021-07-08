import './index.css';
import Stage from './components/stage';

class App {
    constructor() {
        this.createStage();
    }

    createStage() {
        const searchParams = new URLSearchParams(window.location.search);
        const debug = searchParams.get('debug');
        this.stage = new Stage({ debug: Boolean(debug) });
    }
}

new App();
