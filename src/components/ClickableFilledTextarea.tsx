import { Fragment, useRef } from 'react'
import { Button, Form, Input, Space } from 'antd'
import type { FormInstance, FormItemProps } from 'antd'
import type { TextAreaProps, TextAreaRef } from 'antd/es/input/TextArea'
import type { ButtonProps } from 'antd/es/button'

const { TextArea } = Input

// 定义按钮选项类型
type ButtonOption = {
  label: string
  value: string
  [key: string]: any
}
// 定义组件属性类型
type ClickableFilledTextareaProps = {
  form: FormInstance
  textareaName: string
  options: ButtonOption[]
  buttonGutter?: number
  FormItemProps?: FormItemProps
  textareaProps?: TextAreaProps
  buttonProps?: ButtonProps
}

// 主组件
function ClickableFilledTextarea({
  form,
  textareaName = 'content',
  options = [],
  buttonGutter = 10,
  FormItemProps = {},
  textareaProps = {},
  buttonProps = {},
}: ClickableFilledTextareaProps) {
  // 创建一个ref，用于引用TextArea组件
  const textareaEl = useRef<TextAreaRef>(null)

  // 按钮点击事件处理函数
  const onButtonClick = (option: ButtonOption) => {
    // 获取到 textarea 的 dom 元素
    const textAreaDom = textareaEl.current?.resizableTextArea?.textArea
    // 处理 textAreaDom 为 undefined 的情况
    if (!textAreaDom) {
      return
    }
    // 获取到选中内容的开始光标位置
    const selectionStartIndex = textAreaDom.selectionStart
    // 获取到选中内容的结束光标位置
    const selectionEndIndex = textAreaDom.selectionEnd
    // 拼合得到新的字符串内容
    const newStr = `${textAreaDom.value.substring(0, selectionStartIndex)}${option.value}${textAreaDom.value.substring(selectionEndIndex)}`
    // 将 textarea 的 value 设置为新的字符串内容
    textAreaDom.value = newStr
    form.setFieldsValue({
      [textareaName]: newStr
    })
    // 将光标聚焦回到 textarea 上
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
