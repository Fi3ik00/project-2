import styles from './app.module.css';
import data from './data.json';
import { act, useState } from 'react';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	const handleBackButtonClick = () => {
		setActiveIndex(activeIndex - 1);
	};

	const handleForwardButtonClick = () => {
		setActiveIndex(activeIndex + 1);
	};

	const handleStartOverButtonClick = () => {
		setActiveIndex(0);
	};

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	let theFirsStep = steps[activeIndex] === steps[0] ? true : false;
	let theLastStep = steps[activeIndex] === steps[steps.length - 1] ? false : true;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{/* Для получения активного контента использйте steps и activeIndex */}
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((step, index) => (
							<li
								className={`${styles['steps-item']} ${index < activeIndex ? styles.done : ''} ${index === activeIndex ? styles.active : ''}`}
								key={step.id}
							>
								<button
									className={styles['steps-item-button']}
									onClick={() => {
										setActiveIndex(index);
									}}
								>
									{step.id.replace(/^0+/, '')}
								</button>
								{step.title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							disabled={theFirsStep}
							onClick={handleBackButtonClick}
						>
							Назад
						</button>
						{theLastStep ? (
							<button
								className={styles.button}
								onClick={handleForwardButtonClick}
							>
								Далее
							</button>
						) : (
							<button
								className={styles.button}
								onClick={handleStartOverButtonClick}
							>
								Начать сначала
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
