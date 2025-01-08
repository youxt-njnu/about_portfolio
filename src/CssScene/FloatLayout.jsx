// 流式布局
const FloatLayout = () => {
  const container = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "600px",
    border: "black 1px solid",
    display: "flex",
    "align-items": "flex-start",
    "flex-wrap": "wrap",
    "align-content": "flex-start", // 通过这个来调整多行的对齐方式
  }

  const grid = {
    height: "100px",
    flex: "0 0 25%",
    border: "red 1px solid",
    margin: "0",
  }
  return (
    <div style={container}>
      <div style={grid}>111</div>
      <div style={grid}>111</div>
      <div style={grid}>111</div>
      <div style={grid}>111</div>
      <div style={grid}>111</div>
      <div style={grid}>111</div>
      <div style={grid}>111</div>
      <div style={grid}>111</div>
      <div style={grid}>111</div>
      <div style={grid}>111</div>
    </div>
  )
}

export default FloatLayout