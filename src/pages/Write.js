import { useNavigate } from "react-router-dom";
import { useAxios } from "../utils/http";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import InputField from "../components/InputField";

function Write() {
    const navigate = useNavigate();

    const {instance} = useAxios();

    // const [posts, setPosts] = useState([]);

    // const isLoading = useSelector((state) => state.loading.isLoading);

    const titleRef = useRef(null);
    const bodyRef = useRef(null);

    const [inputValue, setInputValue] = useState({
        title: '',
        body: ''
    });

    function onInputChange(e) {
        const {name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name] : value
        })
    }

    const onRegistPost = async () => {
        
        const { data } = await instance.post('/posts', inputValue)
        .then(res => {
        })
        .catch(err => {
            if ( err.response.status === 403 ) {
                alert('머임???')
            }
        });
        console.log("data::::", data);

        if ( data.accessToken ) {
            navigate('/');
        }
    };


    // useEffect(() => {
    //     const getPosts = async () => {
    //         await instance.post('/posts')
    //         .then(res => {
    //             setPosts(res.data);
                
    //         })
    //         .catch(err => {
    //             if ( err.response.status === 401 ) {
    //                 navigate('/login');
    //             }
    //         });
    //     };
    //     getPosts();
    // // eslint-disable-next-line
    // }, [navigate]);

    return (
        <div>
            <InputField
                type="text"
                className=""
                name="title"
                value={inputValue.email}
                placeholder="제목"
                onChange={onInputChange}
                inputRef={titleRef}
            />
            <InputField
                type="text"
                className=""
                name="body"
                value={inputValue.email}
                placeholder="내용"
                onChange={onInputChange}
                inputRef={bodyRef}
            />
            <button onClick={onRegistPost}>등록</button>
        </div>
    )
}

export default Write;