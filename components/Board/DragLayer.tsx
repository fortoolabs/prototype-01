import { useDragLayer } from 'react-dnd';

function DragLayer({ selected }) {
  const props = useDragLayer((monitor) => ({
    offset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
    draggedItem: monitor.getItem(),
  }));
  if (!props.isDragging) {
    return null;
  }
  const width = 90;
  const height = 48;
  const { x, y } = props.offset || { x: 0, y: 0 };
  console.log(props);

  return (
    <div
      style={{
        position: 'absolute',
        userSelect: 'none',
        pointerEvents: 'none',
        top: y,
        left: x,
        width: `${width}px`,
        height: `${height}px`,
        background: 'white',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '3px',
        boxShadow: '0 0 8px rgba(0,0,0,.1)',
      }}
    >
      {props.draggedItem.id.name}
    </div>
  );
}

export default DragLayer;
