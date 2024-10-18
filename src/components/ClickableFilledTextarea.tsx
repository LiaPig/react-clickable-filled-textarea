import { Fragment, useRef } from 'react'
import { Button, Form, Input, Space } from 'antd'
import type { FormInstance, FormItemProps } from 'antd'
import type { TextAreaProps } from 'antd/es/input'
import type { ButtonProps } from 'antd/es/button'

const { TextArea } = Input

type ButtonOption = {
  label: string
  value: string
  [key: string]: any
}
type ClickableFilledTextareaProps = {
  form: FormInstance
  textareaName: string
  options: ButtonOption[]
  buttonGutter?: number
  FormItemProps?: FormItemProps
  textareaProps?: TextAreaProps
  buttonProps?: ButtonProps
}

function ClickableFilledTextarea({
  form,
  textareaName = 'content',
  options = [],
  buttonGutter = 10,
  FormItemProps = {},
  textareaProps = {},
  buttonProps = {},
}: ClickableFilledTextareaProps) {
  const textareaEl = useRef<any>()

  const onButtonClick = (option: ButtonOption) => {
    // 获取到 textarea 的 dom 元素
    const textAreaDom = textareaEl.current.resizableTextArea.textArea
    // 获取到选中内容的开始光标位置
    const selectionStartIndex = textAreaDom.selectionStart
    // 获取到选中内容的结束光标位置
    const selectionEndIndex = textAreaDom.selectionEnd
    // 
    const newStr = `${textAreaDom.value.substring(0, selectionStartIndex)}${option.value}${textAreaDom.value.substring(selectionEndIndex)}`
    // 将 textarea 的 value 设置为新的字符串
    textAreaDom.value = newStr
    form.setFieldsValue({
      [textareaName]: newStr
    })
    // 将光标移动到新的位置
    textAreaDom.focus()
  }

  return (
    <>
      <Form.Item
        {...FormItemProps}
        name={textareaName}
      >
        <TextArea
          rows={4}
          {...textareaProps}
          ref={textareaEl}
        />
      </Form.Item>
      <Form.Item>
        <Space size={buttonGutter}>
          {options.map((option) => (
            <Fragment key={option.value}>
              <Button
                ghost
                type="primary"
                size="small"
                onClick={() => onButtonClick(option)}
                {...buttonProps}
              >
                {option?.label}
              </Button>
            </Fragment>
          ))}
        </Space>
      </Form.Item>
    </>
  )
}

export default ClickableFilledTextarea
