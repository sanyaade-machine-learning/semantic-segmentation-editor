import Paper from "paper";
import SseGlobals from "../../../common/SseGlobals";

export default class SseTools extends Paper.Tool {
    constructor(app2d) {
        super();
        this.editor = app2d;
        this.init();
    }

    init() {

    }

    activate() {
        if (Paper.tool && Paper.tool.cancel)
            Paper.tool.cancel(true);
        super.activate();
        if (this.editor)
            SseGlobals.setCursor(this.cursor || "default");
    }

    isLeftButton(event) {
        return event.event.which == 1;
    }

    isMiddleButton(event) {
        return event.event.which == 2;
    }

    isRightButton(event) {
        return event.event.which == 3;
    }

    viewDown(event) {
        this.downPoint = Paper.view.projectToView(event.point);
        this.downCenter = Paper.view.center;
    }

    viewDrag(event) {
        this.editor.zoomPoint = event.point;
        if (!this.downPoint) {
            this.downPoint = Paper.view.projectToView(event.point);
            this.downCenter = Paper.view.center;
        }

        //if (event.modifiers.space) {
        const deltaPixel = Paper.view.projectToView(event.point).subtract(this.downPoint);
        const candidateCenter = this.downCenter.subtract(deltaPixel.divide(Paper.view.zoom));
        candidateCenter.x = Math.max(this.editor.offsetX, candidateCenter.x);
        candidateCenter.x = Math.min(this.editor.viewWidth - this.editor.offsetX, candidateCenter.x);
        candidateCenter.y = Math.max(this.editor.offsetY, candidateCenter.y);
        candidateCenter.y = Math.min(this.editor.viewHeight - this.editor.offsetY, candidateCenter.y);
        Paper.view.center = candidateCenter;
        //}
        event.event.preventDefault();
    }

    viewUp(event) {
        this.downCenter = this.downPoint = null;
        event.event.preventDefault();
        event.event.stopImmediatePropagation();
    }

}