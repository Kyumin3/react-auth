import { useRef, useState } from "react";
import { useAxios } from "../utils/http";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { useSelector } from "react-redux";

function Register() {
    const navigate = useNavigate();

    const {instance} = useAxios();

    const isLoading = useSelector((state) => state.loading.isLoading);

    const [inputValue, setInputValue] = useState({
        email: '',
        password: ''
    });

    const onInputChange = (e) => {
        console.log('e.target:::', e.target);
        const { name, value } = e.target;
        console.log('nameInput:::', name);
        console.log('nameInput:::', value);
        setInputValue({
            ...inputValue,
            [name]: value
        });
    };

    const onSignUp = async () => {
        if ( !inputValidate() ) {
            return false;
        }
        
        const { data } = await instance.post('/register', inputValue);

        if ( data.accessToken ) {
            navigate('/login');
        }
    };

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const inputValidate = () => {
        if ( !inputValue.email ) {
            alert("이메일을 입력해주세요.");
            emailRef.current.focus();
            return false;
        }

        if ( !inputValue.password ) {
            alert("비밀번호를 입력해주세요.");
            passwordRef.current.focus();
            return false;
        }

        // eslint-disable-next-line
        const emailRegx = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})+$/;
        if ( !emailRegx.test(inputValue.email) ) {
            alert("이메일 형식에 맞게 입력해주세요.");
            emailRef.current.focus();
            return false;
        }

        const passwordRegx = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/;
        if ( !passwordRegx.test(inputValue.password) ) {
            alert("비밀번호는 영문 숫자 조합 8자리 이상 입력해주세요.");
            passwordRef.current.focus();
            return false;
        }

        return true;
    };

    return (
        <>
            {
                isLoading ? <span>로딩 중</span> :
                <div>
                    <InputField
                        type="text"
                        className=""
                        name="email"
                        value={inputValue.email}
                        placeholder="이메일"
                        onChange={onInputChange}
                        inputRef={emailRef}
                    />
                    <InputField
                        type="password"
                        className=""
                        name="password"
                        value={inputValue.password}
                        placeholder="비밀번호"
                        onChange={onInputChange}
                        inputRef={passwordRef}
                    />
                    <button onClick={onSignUp}>회원가입</button>
                </div>
            }
        </>
    )
}

export default Register;