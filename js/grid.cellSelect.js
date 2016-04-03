/*jshint eqeqeq:false */
/*global jQuery */
(function($){
/*
**
 * jqGrid extension for cellediting Grid Data
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/ 
/**
 * all events and options here are aded anonynous and not in the base grid
 * since the array is to big. Here is the order of execution.
 * From this point we use jQuery isFunction
 * formatCell
 * beforeEditCell,
 * onSelectCell (used only for noneditable cels)
 * afterEditCell,
 * beforeSaveCell, (called before validation of values if any)
 * beforeSubmitCell (if cellsubmit remote (ajax))
 * afterSubmitCell(if cellsubmit remote (ajax)),
 * afterSaveCell,
 * errorCell,
 * serializeCellData - new
 * Options
 * cellsubmit (remote,clientArray) (added in grid options)
 * cellurl
 * ajaxCellOptions
* */
"use strict";
$.jgrid.extend({
	selectCell : function (iRow,iCol, ed){
		return this.each(function (){
			var $t = this, nm, tmp,cc, cm;
			if (!$t.grid || $t.p.cellSelect !== true) {return;}
            
			iCol = parseInt(iCol,10);
			// select the row that can be used for other methods
			$t.p.selrow = $t.rows[iRow].id;
            
			

			cm = $t.p.colModel[iCol];
			nm = cm.name;
			if (nm==='subgrid' || nm==='cb' || nm==='rn') {return;}
			cc = $("td:eq("+iCol+")",$t.rows[iRow]);

            if (parseInt($t.p.iCol,10)>=0  && parseInt($t.p.iRow,10)>=0) {
                $("td:eq("+$t.p.iCol+")",$t.rows[$t.p.iRow]).removeClass("edit-cell ui-state-highlight");
                $($t.rows[$t.p.iRow]).removeClass("selected-row ui-state-hover");
            }
            cc.addClass("edit-cell ui-state-highlight");
            $($t.rows[iRow]).addClass("selected-row ui-state-hover");

            $($t).triggerHandler("jqGridSelectCell", [$t.rows[iRow].id, nm, tmp, iRow, iCol]);
            if ($.isFunction($t.p.onSelectCell)) {
                $t.p.onSelectCell.call($t, $t.rows[iRow].id,nm,tmp,iRow,iCol);
            }
			
			$t.p.iCol = iCol; $t.p.iRow = iRow;
		});
	}
});
})(jQuery);
