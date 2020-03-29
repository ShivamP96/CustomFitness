import React from "react";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export default function StudentView(props) {
  

  const [open, setOpen] = React.useState(false);
  const [student, setStudent] = React.useState({});
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = evt => {
    evt.preventDefault();
    const iStudent = props.myStudents.filter(
      student => student.id === props.studentId
    );
    setStudent(iStudent[0]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <CardActions>
        <Button size="small" color="primary" onClick={handleClickOpen}>
          View
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{student.name}</DialogContentText>
            <DialogContentText>
              <img src={student.avatar}></img>{" "}
            </DialogContentText>
            <DialogContentText>Goal: {student.goal}</DialogContentText>
            <DialogContentText>Age: {student.age}</DialogContentText>
            <DialogContentText>Height: {student.height}</DialogContentText>
            <DialogContentText>Weight: {student.weight}</DialogContentText>
            <DialogContentText>
              BMI:{" "}
              {(
                (student.weight /
                  (student.height *
                    0.39 *
                    student.height *
                    0.39)) *
                703
              ).toFixed(2)}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </CardActions>
    </div>
  );
}