import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const DateRangePickerStyled = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center'
}))

export default function MaterialUIPickers(props) {
  const { onChange } = props
  const [startDate, setStartDate] = useState(dayjs().startOf('month'))
  const [endDate, setEndDate] = useState(dayjs().endOf('month'))

  useEffect(() => {
    onChange && onChange(dayjs(startDate).format('YYYY-MM-DD'), dayjs(endDate).format('YYYY-MM-DD'))
  }, [dayjs(startDate).format('YYYY-MM-DD'), dayjs(endDate).format('YYYY-MM-DD'), endDate])

  return (
    <Box sx={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label='Start Date'
          value={startDate}
          onChange={newValue => setStartDate(newValue)}
          maxDate={endDate ?? null}
          sx={{ width: '150px', m: 0.5, mt: 1.5, mb: 1.5 }}
          slotProps={{
            textField: {
              size: 'small'
            }
          }}
        />
        &emsp;
        <DatePicker
          label='End Date'
          value={endDate}
          onChange={newValue => setEndDate(newValue)}
          minDate={dayjs(startDate)}
          maxDate={dayjs(startDate).add(3, 'month').endOf('month')}
          sx={{ width: '150px', m: 0.5, mt: 1.5, mb: 1.5 }}
          slotProps={{
            textField: {
              size: 'small'
            }
          }}
        />
      </LocalizationProvider>
    </Box>
  )
}
