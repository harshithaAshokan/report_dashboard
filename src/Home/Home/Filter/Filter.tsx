import { Button, Col, DatePicker, Form, Row } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { handleEndDate, handleStartDate } from "../../../redux/reducers/AuthReducers";
import { storeDataProps } from "../../../type/reducer";
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD HH-mm-ss';

interface filterProps {
  listapicall: (
    page: number,
    size: number,
    start_date: string | string[],
    end_date: string | string[]
  ) => void;
  currentPage: number;
}

export default function Filter({ listapicall, currentPage }: filterProps) {
  const dispatch = useDispatch();
  const dateSelector = useSelector((state:storeDataProps) => state.auth )
  const userValidationSchema = Yup.object({
    start_date: Yup.string().required("Start Date is required"),
    end_date: Yup.string().required("End Date is required"),
  });

  const handleReset = () => {
    resetForm();
    dispatch(handleStartDate([]))
    dispatch(handleEndDate([]))
  };

  const {
    values,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    resetForm,
  } = useFormik({
    initialValues: {
      end_date: "",
      start_date: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: () => {
      console.log(values, "values in the list ");
      listapicall(currentPage, 10, dateSelector.start_date, dateSelector.end_date);
    },
  });



  return (
    <div>
      <Row gutter={8}>
        <Col>
          <Form.Item label="Start Date">
            <DatePicker
              showTime
              name="start_date"
              value={values.start_date}
              onChange={(date, dateString) => {
                setFieldValue("start_date", date);
                dispatch(handleStartDate(dateString));
              }}
              onBlur={() => setFieldTouched("start_date", true)}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="End Date">
            <DatePicker
              showTime
              name="end_date"
              value={values.end_date}
              onChange={(date, dateString) => {
                setFieldValue("end_date", date);
                dispatch(handleEndDate(dateString))
              }}
              minDate={dayjs(values.start_date, dateFormat)}
              onBlur={() => setFieldTouched("end_date", true)}
             // Disable dates based on the start date
            />
          </Form.Item>
        </Col>
        <Col>
          <Button onClick={() => handleSubmit()} className="primarybtn">
            Submit
          </Button>
        </Col>
        <Col>
          <Button onClick={() => handleReset()} className="secondarybtn">
            Reset
          </Button>
        </Col>
      </Row>
    </div>
  );
}
