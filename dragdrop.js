/***********************************************

  "dragdrop.js"

  Created by Michael Cheng on 06/08/2015 22:31
            http://michaelcheng.us/
            michael@michaelcheng.us
            --All Rights Reserved--

***********************************************/

'use strict';

export const dragdrop = (() => {
	/** The class applied to the target when the cursor is dragged over. Remember to style these in your CSS!! */
	const CLASS_DROP_OVER = 'iqwerty-dragdrop-over';

	/**
	 * The DragDrop object.
	 * @param {HTMLElement} target The target where files should be dragged. This should be a query selector.
	 * @return {Object} Returns the DragDrop object.
	 */
	function setTarget(target) {
		if(!(window.File && window.FileList && window.FileReader)) {
			console.warn('File upload not supported');
		}

		if(!target) {
			return console.warn('The drop target does not exist');
		}

		target.addEventListener('dragover', (event) => onDragOver(event));
		target.addEventListener('dragleave', (event) => onDragLeave(event));
		target.addEventListener('drop', (event) => onDropHandler(event));

		/**
		 * The callback when files are dropped.
		 * @type {Function}
		 */
		let _onDropCallback = null;

		/**
		 * Emphasize the drop target; used when files are dragged over the target.
		 */
		function showTarget() {
			target.classList.add(CLASS_DROP_OVER);
		}

		/**
		 * Return the drop target to its default state; used when user isn't dragging anymore.
		 */
		function hideTarget() {
			target.classList.remove(CLASS_DROP_OVER);
		}

		/**
		 * Called when the user drags something over the target.
		 * @param {Event} event The drag event.
		 */
		function onDragOver(event) {
			event.stopPropagation();
			event.preventDefault();
			showTarget();
		}

		/**
		 * Called when the user leaves the target.
		 * @param {Event} event The drag event.
		 */
		function onDragLeave(event) {
			event.stopPropagation();
			event.preventDefault();
			hideTarget();
		}

		/**
		 * Called when an object is dropped onto the drop target.
		 * Push the file onto the private file stack and call the user defined callback.
		 * @param {Event} event The drop event
		 */
		function onDropHandler(event) {
			onDragLeave(event);

			let files = event.target.files || event.dataTransfer.files;
			files = [].slice.call(files);

			// Call the user defined drop callback
			if(typeof _onDropCallback === 'function') {
				_onDropCallback(files);
			}
		}

		/**
		 * Set the callback to be called when files are dropped
		 * @param {Function} callback A function to be called when files are dropped
		 */
		function setOnDropCallback(callback) {
			_onDropCallback = callback;
		}

		return { setOnDropCallback };
	}

	return { setTarget };
})();