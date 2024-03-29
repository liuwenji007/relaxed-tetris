import { blockType, StorageKey } from './const'
const hiddenProperty = (() => {
  // document[hiddenProperty] 可以判断页面是否失焦
  let names = ['hidden', 'webkitHidden', 'mozHidden', 'msHidden']
  names = names.filter(e => e in document)
  return names.length > 0 ? names[0] : false
})()
const unit = {
  getNextType() {
    debugger;
    // 随机获取下一个方块类型
    const len = blockType.length
    console.log(blockType)
    return blockType[Math.floor(Math.random() * len)]
  },
  getBestType() {
    // 获取最好的方块类型

    const len = blockType.length
    
    return blockType[Math.floor(Math.random() * len)]
  },
  want(next, matrix) {
    // 方块是否能移到到指定位置
    const xy = next.xy
    const shape = next.shape
    const horizontal = shape[0].length
    return shape.every((m, k1) =>
      m.every((n, k2) => {
        if (xy[1] < 0) {
          // left
          return false
        }
        if (xy[1] + horizontal > 10) {
          // right
          return false
        }
        if (xy[0] + k1 < 0) {
          // top
          return true
        }
        if (xy[0] + k1 >= 20) {
          // bottom
          return false
        }
        if (n) {
          if (matrix[xy[0] + k1][xy[1] + k2]) {
            return false
          }
          return true
        }
        return true
      })
    )
  },
  isClear(matrix) {
    // 是否达到消除状态
    const clearLines = []
    matrix.forEach((m, k) => {
      if (m.every(n => !!n)) {
        clearLines.push(k)
      }
    })
    if (clearLines.length === 0) {
      return false
    }
    return clearLines
  },
  getTopBottomMatrix(matrix) {
    //
  },
  whichNext(matrix) {
    // 下一个哪个最好
    matrix.forEach((m, k) => {
      if (m.every(n => !!n)) {
        clearLines.push(k)
      }
    })

  },
  isOver(matrix) {
    // 游戏是否结束, 第一行落下方块为依据

    return matrix[0].some(n => !!n)
  },
  subscribeRecord(store) {
    // 将状态记录到 localStorage
    store.subscribe(() => {
      let data = store.state
      if (data.lock) {
        // 当状态为锁定, 不记录
        return
      }
      data = JSON.stringify(data)
      data = encodeURIComponent(data)
      if (window.btoa) {
        data = btoa(data)
      }
      window.localStorage.setItem(StorageKey, data)
    })
  },
  isMobile() {
    // 判断是否为移动端
    const ua = navigator.userAgent
    const android = /Android (\d+\.\d+)/.test(ua)
    const iphone = ua.indexOf('iPhone') > -1
    const ipod = ua.indexOf('iPod') > -1
    const ipad = ua.indexOf('iPad') > -1
    const nokiaN = ua.indexOf('NokiaN') > -1
    return android || iphone || ipod || ipad || nokiaN
  },
  /**
   * @description: 判断权重
   * @param {*} heightWeight 网格高度权重
   * @param {*} linesWeight 网格行数权重
   * @param {*} holesWeight 空洞数权重
   * @param {*} bumpinessWeight 凹凸度权重
   * @return {*}
   */
  AI(heightWeight, linesWeight, holesWeight, bumpinessWeight) {
    this.heightWeight = heightWeight;
    this.linesWeight = linesWeight;
    this.holesWeight = holesWeight;
    this.bumpinessWeight = bumpinessWeight;
    _best = function (grid, workingPieces, workingPieceIndex) {
      const best = null;
      const bestScore = null;
      const workingPiece = workingPieces[workingPieceIndex];

      for (let rotation = 0; rotation < 4; rotation++) {
        var _piece = workingPiece.clone();
        for (var i = 0; i < rotation; i++) {
          _piece.rotate(grid);
        }

        while (_piece.moveLeft(grid));

        while (grid.valid(_piece)) {
          var _pieceSet = _piece.clone();
          while (_pieceSet.moveDown(grid));

          var _grid = grid.clone();
          _grid.addPiece(_pieceSet);

          var score = null;
          if (workingPieceIndex == (workingPieces.length - 1)) {
            score = -this.heightWeight * _grid.aggregateHeight() + this.linesWeight * _grid.lines() - this.holesWeight * _grid.holes() - this.bumpinessWeight * _grid.bumpiness();
          } else {
            score = this._best(_grid, workingPieces, workingPieceIndex + 1).score;
          }

          if (score > bestScore || bestScore == null) {
            bestScore = score;
            best = _piece.clone();
          }

          _piece.column++;
        }
      }

      return { piece: best, score: bestScore };
    };
    best = function (grid, workingPieces) {
      return this._best(grid, workingPieces, 0).piece;
    };
  },


  visibilityChangeEvent: (() => {
    if (!hiddenProperty) {
      return false
    }
    return hiddenProperty.replace(/hidden/i, 'visibilitychange') // 如果属性有前缀, 相应的事件也有前缀
  })(),
  isFocus: () => {
    if (!hiddenProperty) {
      // 如果不存在该特性, 认为一直聚焦
      return true
    }
    return !document[hiddenProperty]
  }
}
export const {
  getNextType,
  getBestType,
  isMobile,
  want,
  isClear,
  isOver,
  subscribeRecord,
  visibilityChangeEvent,
  isFocus
} = unit
