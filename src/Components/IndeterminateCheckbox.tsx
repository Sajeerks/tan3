import { useEffect, useRef , } from "react";



function IndeterminateCheckbox({ indeterminate, ...rest }:any) {
  const ref = useRef<HTMLInputElement>(null) ;

useEffect(() => {
    if (typeof indeterminate === "boolean") {
    
      // if(!rest.checked)  return
            ref.current!.indeterminate = !rest.checked && indeterminate;

        
    }
  }, [ref, indeterminate]);

  return <input type="checkbox" ref={ref} {...rest} />;
}

export default IndeterminateCheckbox;