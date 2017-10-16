if (!viewability_tab_hidden) {
    try {
        if (typeof document['hidden'] !== undefined) {
            viewability_tab_hidden = 'hidden';
            viewability_tab_change = 'visibilitychange';
        } else if (typeof document['mozHidden'] !== undefined) {
            viewability_tab_hidden = 'mozHidden';
            viewability_tab_change = 'mozvisibilitychange';
        } else if (typeof document['msHidden'] !== undefined) {
            viewability_tab_hidden = 'msHidden';
            viewability_tab_change = 'msvisibilitychange';
        } else if (typeof document['webkitHidden'] !== undefined) {
            viewability_tab_hidden = 'webkitHidden';
            viewability_tab_change = 'webkitvisibilitychange';
        }
    } catch (U87) {}
}

function get_active_tab() {
    var C87;
    C87 = 0;
    try { if (typeof document['addEventListener'] != undefined && typeof viewability_tab_hidden != undefined) { if (document[viewability_tab_hidden]) { C87 = 2; } else { C87 = 1; } } } catch (X87) { C87 = 0; }
    return C87;
}
