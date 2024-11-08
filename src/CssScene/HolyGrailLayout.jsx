import React from 'react'

const HolyGrailLayout = () => {
    const hf = {
        border: "purple 1px solid",
        flex: 1,
      }
    const view = {
        "box-sizing": "border-box", /* content-box, 肚子里有货，比较刚，width是多少就是多少，margin/padding影响不到最后的width */
        width: "100vw",
        height: "100vh",
        display: "flex",
        "flex-direction": "column",
        border: "yellow 4px solid",
      }
      const container = {
        border: "red 1px solid",
        flex: "80%",
        display: "flex",
        width: "100%",
        height: "100%"
      }
      const gridCell = {
        border: "blue 1px solid",
        flex: 1
      }

      const uniq = {
        flex: "0 0 12em",
      }

  return (
    <div style={view}>
      <header style={hf}>header</header>
      <div style={container}>
        <div style={{ ...gridCell, ...uniq }}>1</div>
        <div style={gridCell}>2</div>
        <div style={{ ...gridCell, ...uniq }}>3</div>
      </div>
      <footer style={hf}>footer</footer>
    </div>
  )
}

export default HolyGrailLayout