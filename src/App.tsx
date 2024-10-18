import { Form } from 'antd'
import ClickableFilledTextarea from './components/ClickableFilledTextarea'
import './App.css'

function App() {
  const [form] = Form.useForm()

  return (
    <div className="App">
      <Form form={form} style={{ width: '1280px' }}>
        <ClickableFilledTextarea
          form={form}
          textareaName="content"
          options={[
            {
              label: 'id',
              value: '{id}',
            },
            {
              label: '姓名',
              value: '{name}',
            },
            {
              label: '年龄',
              value: '{age}',
            },
            {
              label: '性别',
              value: '{gender}',
            }
          ]}
          FormItemProps={{ label: '内容' }}
        />
      </Form>
    </div>
  )
}

export default App
