import {
	Box,
	SimpleGrid,
	Text,
	VStack,
	Image,
	Heading,
} from "@chakra-ui/react";
import MainContainer from "../../Components/Container/MainContainer";

export default function AboutMain() {
	const colorList = {
		white: "#FFFFFF",
		green: "#10B981",
		darkGreen: "#059669",
	};

	const aboutData = {
		image: "/logo_aac.png",
		nama: "Nicholas Martin",
		nim: "535220027",
		topikSkripsi:
			"Perbandingan Model LLaMA, Mistral dan Flan-T5 untuk Pembuatan Kisah Sosial Otomatis dari Kumpulan Kartu Gambar",
		dosenPembimbing: "Lely Hiryanto, ST., M.Sc., PhD.",
		sinopsis: `Augmentative and Alternative Communication (AAC) adalah alat bantu komunikasi nonverbal yang digunakan untuk mendukung individu berkebutuhan khusus yang memiliki kesulitan verbal, seperti anak-anak dengan disabilitas, autisme, cerebral palsy, atau lainnya. Dengan perkembangan teknologi, penggunaan AAC dapat meningkatkan kualitas hidup individu dengan hambatan komunikasi .
            Meskipun AAC membantu individu dalam berkomunikasi, sebagian pengguna memilih untuk diam karena prosesnya yang terlalu lambat. Salah satu strategi untuk mengatasi masalah tersebut adalah pendekatan social stories. Social stories membantu anak-anak memahami situasi dengan menyusun cerita berdasarkan konteks, tempat, dan perilaku. Pendekatan ini dapat menjadi pelengkap dalam penggunaan AAC untuk mengurangi frustasi yang sering muncul dalam interaksi sosial sehari-hari.
            Dengan kemunculan Large Language Model (LLM), pengembangan AAC dalam pembuatan cerita terbantu. LLM adalah model dalam subfield NLP yang memahami dan merancang human-like text, sehingga sangat cocok untuk berbagai aplikasi. Integrasi LLM ke dalam AAC terbukti meningkatkan efisiensi komunikasi hingga 57% dengan menyederhanakan proses input dan mempercepat pembentukan kalimat.
            Meskipun demikian, sebagian besar model LLM yang digunakan masih terbatas pada satu bahasa saja, yaitu bahasa Inggris, sehingga belum banyak penerapan LLM secara spesifik dalam AAC berbahasa Indonesia. Hasil yang diharapkan adalah terbentuknya sistem AAC berbahasa Indonesia yang mampu menghasilkan kalimat atau cerita tanpa membutuhkan banyak kata kunci atau kartu AAC, sehingga membuat proses komunikasi lebih cepat dan efisien bagi pengguna.`,
	};

	return (
		<MainContainer>
			<Box p={6}>
				<Heading mb={6}>Tentang</Heading>

				<SimpleGrid columns={2} spacing={8}>
					<Box
						bg={colorList.white}
						h="600px"
						borderRadius="12px"
						p="32px"
						display="flex"
						alignItems="center"
						justifyContent="center"
						boxShadow="md"
					>
						<Image
							src={aboutData.image}
							alt="Profile"
							borderRadius="12px"
							objectFit="cover"
							w="100%"
							h="100%"
						/>
					</Box>

					<Box
						bg={colorList.white}
						h="600px"
						borderRadius="12px"
						display="flex"
						flexDir="column"
						gap={2}
						boxShadow="md"
						overflow="auto"
						p={4}
					>
						<Box p={2}>
							<Text fontSize="18px" fontWeight="bold">
								Nama / NIM
							</Text>
							<Text fontSize="16px">
								{aboutData.nama} / {aboutData.nim}
							</Text>
						</Box>

						<Box p={2}>
							<Text fontSize="18px" fontWeight="bold">
								Topic Skripsi
							</Text>
							<Text fontSize="16px">
								{aboutData.topikSkripsi}
							</Text>
						</Box>

						<Box p={2}>
							<Text fontSize="18px" fontWeight="bold">
								Dosen Pembimbing
							</Text>
							<Text fontSize="16px">
								{aboutData.dosenPembimbing}
							</Text>
						</Box>

						<Box p={2}>
							<Text fontSize="18px" fontWeight="bold">
								Sinopsis
							</Text>
							<Text fontSize="16px" textAlign="justify">
								{aboutData.sinopsis}
							</Text>
						</Box>
					</Box>
				</SimpleGrid>
			</Box>
		</MainContainer>
	);
}
