import { useState } from "react";
import Button from "../components/Buttons";
import Modal from "../components/Modal";

function ModalPage() {
	const [showModal, setShowModal] = useState(false);

	const handleClick = () => {
		setShowModal(true);
	};

	const handleClose = () => {
		setShowModal(false);
	};

	const actionBar = (
		<div>
			<Button primary>I Accept</Button>{" "}
		</div>
	);

	const modal = (
		<Modal onClose={handleClose} actionBar={actionBar}>
			<p>Here is an important aggrement for you to accept</p>
		</Modal>
	);

	return (
		<div>
			<Button onClick={handleClick} primary>
				Open Modal
			</Button>
			{showModal && modal}
			<p>
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry. Lorem Ipsum has been the industry&apos;s standard
				dummy text ever since the 1500s, when an unknown printer took a
				galley of type and scrambled it to make a type specimen book. It
				has survived not only five centuries,
			</p>

			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
				quis turpis pulvinar, cursus orci eu, vestibulum felis. Cras
				nunc mi, mattis eget sagittis nec, sodales ut ante. Ut at eros
				in elit elementum pellentesque eget id ex. Vivamus venenatis
				tortor a odio aliquet, vel iaculis nibh euismod. Aliquam id
				laoreet risus. Proin non placerat sem. Fusce eget tincidunt
				purus, sit amet varius purus. Aliquam magna ante, mollis nec
				gravida et, elementum eu sapien. In hac habitasse platea
				dictumst. Duis quis tellus mi. Donec dignissim nisl quis orci
				dapibus, at porttitor dui porttitor. Maecenas porttitor leo ac
				consectetur fringilla. Cras ante felis, fermentum ut nisl id,
				gravida malesuada dui. Nunc gravida libero nec mi tincidunt, nec
				faucibus orci volutpat. Proin a justo vitae ante maximus tempor
				vel nec neque. Nulla quis dui eget justo auctor imperdiet eu
				eget lorem. Aliquam efficitur rutrum velit, nec porta felis
				sollicitudin et. Mauris convallis sit amet massa vitae viverra.
				Aliquam vel aliquam tellus. Nulla erat arcu, porttitor vitae
				vehicula quis, faucibus sed metus. Integer consectetur, tortor
				et viverra dictum, risus lorem molestie justo, non placerat orci
				dolor at velit. Mauris luctus sit amet orci vitae finibus. Duis
				quis quam leo. Pellentesque finibus sollicitudin ipsum, quis
				porta felis auctor ac. Quisque porttitor, ipsum eget vulputate
				finibus, metus dui vestibulum augue, in bibendum orci purus
				convallis sapien. In porta, est id dapibus cursus, sapien erat
				cursus odio, vitae mattis elit tortor eu urna. Donec bibendum,
				metus at tincidunt bibendum, libero lacus consectetur nibh, eget
				bibendum turpis mauris ac ante. Duis urna arcu, facilisis ut
				urna vitae, sodales bibendum lacus. Nullam sit amet tempus quam,
				non posuere arcu.
			</p>
			<p>
				Quisque massa libero, efficitur et sollicitudin suscipit, mattis
				vel orci. Proin metus odio, euismod id nisi sed, venenatis
				pellentesque turpis. Vestibulum ultrices est ac augue varius,
				sit amet malesuada nisi mattis. Class aptent taciti sociosqu ad
				litora torquent per conubia nostra, per inceptos himenaeos.
				Vivamus id porttitor nunc. Maecenas ut arcu iaculis, laoreet
				quam consectetur, molestie augue. Etiam euismod dui eget leo
				finibus, blandit suscipit dui scelerisque. Donec eros lacus,
				tristique sed eros non, tristique porttitor dolor. Quisque mi
				nibh, luctus sed ornare a, rhoncus sit amet libero. Proin
				viverra nibh ut felis vestibulum tempus. Vivamus lorem magna,
				auctor ac mi id, commodo suscipit ante. Cras interdum sagittis
				consequat. Nullam varius ullamcorper nulla, a dictum massa. Duis
				facilisis tristique neque non gravida. Nulla congue urna
				pulvinar lacus congue, vitae placerat orci mattis. Mauris
				consequat, nisl at pulvinar luctus, risus metus aliquam magna,
				sit amet pulvinar ex enim in urna. Ut vulputate elit a eros
				sagittis bibendum et sed mi. Proin vestibulum elementum
				lobortis. Pellentesque imperdiet commodo tortor. Nunc commodo
				tincidunt nisl. Pellentesque quis fringilla sapien, eu porttitor
				velit. Integer at consequat urna. In ut mauris sapien. In sed
				sem ex. Nunc fermentum nibh quis metus scelerisque, vel luctus
				tortor egestas. Vestibulum scelerisque libero tellus, in egestas
				nisl efficitur vel. Sed ornare libero metus, et aliquam arcu
				laoreet et. Cras sed lectus nec metus tristique accumsan eu non
				nulla. Nullam vehicula auctor urna sodales commodo. Fusce
				pretium pretium enim, at vehicula erat eleifend eget. Donec ac
				lorem in sem consequat luctus eget a diam. Maecenas id accumsan
				justo, in pharetra elit. Etiam eu tristique tortor.
			</p>
			{showModal && modal}
		</div>
	);
}

export default ModalPage;
