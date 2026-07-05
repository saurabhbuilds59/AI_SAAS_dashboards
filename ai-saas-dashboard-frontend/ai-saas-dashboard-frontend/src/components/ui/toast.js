import toast from 'react-hot-toast'

const baseStyle = {
  background: '#151822',
  color: '#EDEFF5',
  border: '1px solid #232838',
  fontSize: '13px',
}

export const notify = {
  success: (msg) => toast.success(msg, { style: baseStyle, iconTheme: { primary: '#2DD4BF', secondary: '#151822' } }),
  error: (msg) => toast.error(msg, { style: baseStyle, iconTheme: { primary: '#F0556B', secondary: '#151822' } }),
  info: (msg) => toast(msg, { style: baseStyle, icon: '💡' }),
}

export default notify
