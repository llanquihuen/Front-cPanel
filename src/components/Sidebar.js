// import React,{useState} from 'react';
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';


// const useStyles = makeStyles({
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: 'auto',
//   },
// });

// export default function Sidebar() {
//   const classes = useStyles();
//   const [state, setState] = useState({right: true});
//   const anchor='right'
//   const toggleDrawer = (anchor, open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <div
//       className={clsx(classes.list)}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//      <p>Hola</p>
//     </div>
//   );

//   return (
//     <div>
           
//         <React.Fragment key={anchor}>
//           <Button onClick={toggleDrawer(anchor, true)}>Carro</Button>
//           <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>{list(anchor)}</Drawer>
//         </React.Fragment>
      
//     </div>
//   );
// }

