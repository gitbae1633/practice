import React, {useRef, useState, useEffect} from 'react'
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';

function AddItem({itemUpdateHandler, businessDetail, item, setItem}) {

    const refForm = useRef(null);
    
    const [target, setTarget] = useState(); // 수정되기 이전의 행의 code값

    useEffect(() => {
        setTarget(businessDetail.code);

        setItem({
            code: businessDetail.code,
            name: businessDetail.name,
            phone: businessDetail.phone
        });
        return () => {};
    }, [businessDetail]);

    const changeHandler = (e) => {
        const { value, name } = e.target;
        setItem({ ...item, [name]: value });
    };
    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(item, target);
        itemUpdateHandler(item, target);
        setItem({ code: "", name: "", phone: "" }); // clear
    };

    return (

        <Box
        boxShadow="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
        sx={{
            padding: 3
        }}>
            <span style={{
                borderBottom: '2px solid black',
                fontSize: '20px',
                fontWeight: 600            
            }}>세부사항</span>
            <FormControl
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 400,
                    marginTop: 3 }}
                component='form' 
                ref={refForm} 
                onSubmit={onSubmitHandler
                        // addList(e);
                        // refForm.current.reset();
                }>
                <Typography>아이디</Typography>
                <TextField 
                    id="code" 
                    name="code" 
                    type="text" 
                    variant="outlined" 
                    size="small"
                    value={item.code || ""}
                    onChange={changeHandler} />

                <Typography sx={{marginTop: 2}}>거래처명</Typography>
                <TextField 
                    id="name" 
                    name="name" 
                    type="text" 
                    variant="outlined" 
                    size="small"
                    value={item.name || ""}
                    onChange={changeHandler} />

                <Typography sx={{marginTop: 2}}>폰번호</Typography>
                <TextField 
                    id="phone" 
                    name="phone" 
                    type="text" 
                    variant="outlined" 
                    size="small"
                    value={item.phone || ""}
                    onChange={changeHandler} />

                <Button type="submit" name='submit' variant="outlined" sx={{marginTop: 2}}>수정</Button>
            </FormControl>
        </Box>
    )
}

export default AddItem