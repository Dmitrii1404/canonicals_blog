import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import {ArticleStateType, defaultArticleState, fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, OptionType} from 'src/constants/articleProps';
import {FormEvent, MouseEventHandler, useRef, useState, useEffect} from "react";
import clsx from "clsx";
import {Text} from "components/text";
import {Select} from "components/select";
import {RadioGroup} from "components/radio-group";

interface ArticleParamsFormProps {
	setArticleState: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [formHide, setFormHide] = useState<boolean>(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const formRef = useRef<HTMLFormElement | null>(null);

	useEffect(() => {
		if (formHide) {
			document.addEventListener('mousedown', handleOutsideClick);
		} else {
			document.removeEventListener('mousedown', handleOutsideClick);
		}

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [formHide]);

	const toggleFormHide = () => {
		setFormHide((prev) => !prev);
	};

	const handleOutsideClick = (event: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setFormHide(false);
		}
	};

	const changeFormState = (
		value: string,
		field: keyof ArticleStateType,
		options: OptionType[]
	) => {
		const currentOptions = options.find((op) => op.value === value);
		setFormState((prev) => ({ ...prev, [field]: currentOptions }));
	};

	const setDefaultOptions = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const applyFormOptions = (event: FormEvent) => {
		event.preventDefault();
		setArticleState(formState);
		setFormHide(false);
	};

	return (
		<>
			<ArrowButton onClick={toggleFormHide} state={formHide} />
			<aside
				className={clsx(styles.container, {
					[styles['container_open']]: formHide,
				})}>
				<form className={styles.form} ref={formRef}>
					<div className={styles.textContainer}>
						<Text as='h1' size={31} weight={800} uppercase={true}>
							Задайте параметры
						</Text>
					</div>

					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(event: OptionType) =>
							changeFormState(event.value, 'fontFamilyOption', fontFamilyOptions)
						}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(event) =>
							changeFormState(event.value, 'fontSizeOption', fontSizeOptions)
						}
					/>

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(event: OptionType) =>
							changeFormState(event.value, 'fontColor', fontColors)
						}
					/>

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(event: OptionType) =>
							changeFormState(event.value, 'backgroundColor', backgroundColors)
						}
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(event: OptionType) =>
							changeFormState(event.value, 'contentWidth', contentWidthArr)
						}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={setDefaultOptions}
						/>
						<Button
							title='Применить'
							type='submit'
							onClick={applyFormOptions}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
