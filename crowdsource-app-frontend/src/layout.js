import Container from "react-bootstrap/esm/Container"

const Layout = ({children}) => {
  
  return(
    <div style ={{
      padding: '40px 0px'
    }}>
      <Container>
        {children}
      </Container>
    </div>
  )
}

export default Layout