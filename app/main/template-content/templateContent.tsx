import "./index.scss";

const TemplateContent = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="template-content">
      {children}
    </div>
  )
}

export default TemplateContent;