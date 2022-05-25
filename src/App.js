// import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import RenderIf from "./components/RenderIf";
import { SunIcon } from "./SunIcon";
import { MoonIcon } from "./MoonIcon";
import {
  Switch,
  Button,
  Input,
  Grid,
  Card,
  Text,
  Checkbox,
  Modal,
} from "@nextui-org/react";
import useDarkMode from "use-dark-mode";

function App() {
  //dark mode
  const darkMode = useDarkMode(false);

  const [todos, setTodos] = useState([]);
  const [visible, setVisible] = useState(false);
  const [todoInput, setTodoInput] = useState("");

  const handler = (todoId) => {
    const [todo] = todos.filter((todo) => todo.ids === todoId);
    setTodoInput(todo.value);
    setVisible(true);
  };

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const getTodoValue = () => {
    const todoValue = document.querySelector("#todoInput").value;
    document.querySelector("#todoInput").value = "";
    setTodos([
      ...todos,
      { ids: todos.length, value: todoValue, isChecked: false },
    ]);
  };

  const getUpdatedTodoValue = (id) => {
    debugger;
    const updatedValue = document.querySelector("#updateField").value;
    const updatedTodo = todos.filter((todo) => {
      if (todo.ids === id) {
        console.log(
          "🚀 ~ file: App.js ~ line 57 ~ updatedTodo ~ todo.ids",
          todo.ids
        );
        todo.value = updatedValue;
        console.log(
          "🚀 ~ file: App.js ~ line 54 ~ updatedTodo ~ todo.value",
          todo.value
        );
      }
      return todo;
    });
    setTodos(updatedTodo);
  };

  const removeValue = (id) => {
    const newTodos = todos.filter((todo) => !(todo.ids === id));
    // setTodos([...todos.slice(0, ids), ...todos.slice(ids + 1)]);
    setTodos(newTodos);
  };

  const tickTodo = (e, id) => {
    const newTodos = todos.map((todo) => {
      if (todo.ids === id) {
        todo.isChecked = !todo.isChecked;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  // const handleChange = (newValue, id) => {
  //   const newTodos = todos.map((todo) => {
  //     if (todo.ids === id) {
  //       todo.value = newValue;
  //       console.log(
  //         "🚀 ~ file: App.js ~ line 70 ~ newTodos ~ todo.value",
  //         todo.value
  //       );
  //     }
  //     return todo;
  //   });

  //   setTodos(newTodos);
  // };

  const onClickHandler = (id) => {
    closeHandler();
    getUpdatedTodoValue(id);
  };

  return (
    <div>
      <Grid.Container gap={2} justify="left">
        <Grid xs={12} sm={6}>
          <Card>
            <Text
              h1
              size={20}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
              }}
              weight="bold"
            >
              Change Theme
            </Text>
            <Switch
              checked={darkMode.value}
              onChange={() => darkMode.toggle()}
              iconOn={<MoonIcon filled />}
              iconOff={<SunIcon filled />}
            />
          </Card>
        </Grid>
      </Grid.Container>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={6}>
          <Card>
            <Text
              h1
              size={50}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
              }}
              weight="bold"
            >
              What need to be done
            </Text>
            <div className="addField">
              <Input
                clearable
                bordered
                placeholder="Add to list"
                className="inputField"
                id="todoInput"
              ></Input>
              <Button size="lg" color="gradient" auto onClick={getTodoValue}>
                Add #{todos.length + 1}
              </Button>
            </div>
            <RenderIf isTrue={todos.length > 0} isFalse="Todo item not found">
              {todos.map((todo, ids) => {
                return (
                  <Card key={ids} bordered shadow={false}>
                    <div className="form-check">
                      <Grid.Container
                        gap={2}
                        justify="center"
                        css={{ alignItems: "baseline" }}
                      >
                        <Grid xs={4}>
                          <Checkbox
                            onChange={(e) => tickTodo(e, todo.ids)}
                            color="gradient"
                          ></Checkbox>
                        </Grid>
                        <Grid xs={4}>
                          <arial-label
                            className="form-check-label checkValue"
                            htmlFor="defaultCheck1"
                          >
                            <p
                            // contentEditable="true"
                            // onInput={(e) => {
                            //   newValue = e.currentTarget.textContent;
                            //   console.log(
                            //     "🚀 ~ file: App.js ~ line 84 ~ {todos.map ~ newValue",
                            //     newValue
                            //   );
                            //   setIsUpdateTodo(true);
                            // }}
                            // onClick={onHandleClick}
                            >
                              <Text weight="bold" size={25}>
                                {todo.value}
                              </Text>
                            </p>
                          </arial-label>
                        </Grid>
                        <Grid xs={4}>
                          <Button
                            color="gradient"
                            auto
                            ghost
                            onClick={() => handler(todo.ids)}
                          >
                            Update
                          </Button>
                          <Button
                            color="gradient"
                            auto
                            ghost
                            className="deleteBtn"
                            onClick={() => removeValue(todo.ids)}
                          >
                            Delete
                          </Button>
                        </Grid>
                      </Grid.Container>
                    </div>
                  </Card>
                );
              })}
            </RenderIf>
          </Card>
        </Grid>
        <Grid xs={12} sm={6}>
          <Card>
            <Text
              h1
              size={50}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
              }}
              weight="bold"
            >
              What have been done
            </Text>
            <ul className="todoList">
              {todos
                .filter((todo) => todo.isChecked)
                .map((todo, ids) => (
                  <Card key={ids} className="todoItem" bordered shadow={false}>
                    <Text weight="bold" size={25}>
                      {todo.value}
                    </Text>
                  </Card>
                ))}
            </ul>
          </Card>
        </Grid>
      </Grid.Container>
      {todos.map((todo, ids) => {
        return (
          <Modal
            key={ids}
            closeButton
            preventClose
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
          >
            <Modal.Header>
              <Text id="modal-title" size={18}>
                Todo Value
              </Text>
            </Modal.Header>
            <Modal.Body>
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                initialValue={todoInput}
                id="updateField"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button auto flat color="error" onClick={closeHandler}>
                Close
              </Button>
              <Button auto onClick={() => onClickHandler(todo.ids)}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        );
      })}
    </div>
  );
}

export default App;

//check sai id khi update
// chưa update được cái thứ 2
// chưa map được modal để lấy updateField
