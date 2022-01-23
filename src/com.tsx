import { toggleSlice, useAppDispatch, useAppSelector } from "./redux";

export default function Com() {
  const studentdata = useAppSelector((state) => state.rootReducer.studentdata);
  let dispatch = useAppDispatch();
  console.log(studentdata);

  return (
    <div>
      <button
        onClick={() => {
          dispatch(toggleSlice.actions.toggle());
        }}
      >
        logout
      </button>
      {studentdata ? (
        studentdata.map((i) => (
          <div className="border" key={i.name}>
            <h1>{i.name}</h1>
            <p>
              {i.arr.map((i) => (
                <span> {i?.name}</span>
              ))}
            </p>
          </div>
        ))
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}
