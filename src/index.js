import './index.css';
import Stage from './components/stage';

class App {
    constructor() {
        this.createStage();
    }

    createStage() {
        this.stage = new Stage();
    }
}

new App();
