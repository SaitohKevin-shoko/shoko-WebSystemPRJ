function freezeScreenThis(msg) {
      scroll(0,0);
      var outerPane = document.getElementById('FreezePane');
      var innerPane = document.getElementById('InnerFreezePane');
      if (outerPane) outerPane.className = 'FreezePaneOn';
      if (innerPane) innerPane.className = 'InnerFreezePane';
      if (innerPane) innerPane.innerHTML = msg;
}

function freezeScreenParent(msg, innerflg) {
      var outerPane = parent.document.getElementById('FreezePane');
      if (outerPane) outerPane.className = 'FreezePaneOn';

      if (innerflg == true) {
          var innerPane = parent.document.getElementById('InnerFreezePane');
          if (innerPane) innerPane.innerHTML = msg;
          if (innerPane) innerPane.className = 'InnerFreezePane';
      }
}

function clearScreenParent(innerflg) {
    var outerPane = parent.document.getElementById('FreezePane');
    if (outerPane) outerPane.className = '';

    if (innerflg == true) {
        var innerPane = parent.document.getElementById('InnerFreezePane');
        if (innerPane) innerPane.innerHTML = '';
        if (innerPane) innerPane.className = 'FreezePaneOff';
    }
}

