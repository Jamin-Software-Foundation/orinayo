del %1.ogg

.\ffmpeg -i %1/BEN_MAJ_C.wav -i %1/BEN_MAJ_C#.wav -i %1/BEN_MAJ_D.wav -i %1/BEN_MAJ_D#.wav -i %1/BEN_MAJ_E.wav -i %1/BEN_MAJ_F.wav -i %1/BEN_MAJ_F#.wav -i %1/BEN_MAJ_G.wav -i %1/BEN_MAJ_G#.wav -i %1/BEN_MAJ_A.wav -i %1/BEN_MAJ_A#.wav -i %1/BEN_MAJ_B.wav -filter_complex "[0:0][1:0][2:0][3:0][4:0][5:0][6:0][7:0][8:0][9:0][10:0][11:0]concat=n=12:v=0:a=1[out]" -map "[out]" %1_1.wav
.\ffmpeg -i %1/BEN_MIN_C.wav -i %1/BEN_MIN_C#.wav -i %1/BEN_MIN_D.wav -i %1/BEN_MIN_D#.wav -i %1/BEN_MIN_E.wav -i %1/BEN_MIN_F.wav -i %1/BEN_MIN_F#.wav -i %1/BEN_MIN_G.wav -i %1/BEN_MIN_G#.wav -i %1/BEN_MIN_A.wav -i %1/BEN_MIN_A#.wav -i %1/BEN_MIN_B.wav -filter_complex "[0:0][1:0][2:0][3:0][4:0][5:0][6:0][7:0][8:0][9:0][10:0][11:0]concat=n=12:v=0:a=1[out]" -map "[out]" %1_2.wav
.\ffmpeg -i %1/BIN_MAJ_C.wav -i %1/BIN_MAJ_C#.wav -i %1/BIN_MAJ_D.wav -i %1/BIN_MAJ_D#.wav -i %1/BIN_MAJ_E.wav -i %1/BIN_MAJ_F.wav -i %1/BIN_MAJ_F#.wav -i %1/BIN_MAJ_G.wav -i %1/BIN_MAJ_G#.wav -i %1/BIN_MAJ_A.wav -i %1/BIN_MAJ_A#.wav -i %1/BIN_MAJ_B.wav -filter_complex "[0:0][1:0][2:0][3:0][4:0][5:0][6:0][7:0][8:0][9:0][10:0][11:0]concat=n=12:v=0:a=1[out]" -map "[out]" %1_3.wav
.\ffmpeg -i %1/BIN_MIN_C.wav -i %1/BIN_MIN_C#.wav -i %1/BIN_MIN_D.wav -i %1/BIN_MIN_D#.wav -i %1/BIN_MIN_E.wav -i %1/BIN_MIN_F.wav -i %1/BIN_MIN_F#.wav -i %1/BIN_MIN_G.wav -i %1/BIN_MIN_G#.wav -i %1/BIN_MIN_A.wav -i %1/BIN_MIN_A#.wav -i %1/BIN_MIN_B.wav -filter_complex "[0:0][1:0][2:0][3:0][4:0][5:0][6:0][7:0][8:0][9:0][10:0][11:0]concat=n=12:v=0:a=1[out]" -map "[out]" %1_4.wav
.\ffmpeg -i %1/EN_MAJ_C.wav -i %1/EN_MAJ_C#.wav -i %1/EN_MAJ_D.wav -i %1/EN_MAJ_D#.wav -i %1/EN_MAJ_E.wav -i %1/EN_MAJ_F.wav -i %1/EN_MAJ_F#.wav -i %1/EN_MAJ_G.wav -i %1/EN_MAJ_G#.wav -i %1/EN_MAJ_A.wav -i %1/EN_MAJ_A#.wav -i %1/EN_MAJ_B.wav -filter_complex "[0:0][1:0][2:0][3:0][4:0][5:0][6:0][7:0][8:0][9:0][10:0][11:0]concat=n=12:v=0:a=1[out]" -map "[out]" %1_5.wav
.\ffmpeg -i %1/EN_MIN_C.wav -i %1/EN_MIN_C#.wav -i %1/EN_MIN_D.wav -i %1/EN_MIN_D#.wav -i %1/EN_MIN_E.wav -i %1/EN_MIN_F.wav -i %1/EN_MIN_F#.wav -i %1/EN_MIN_G.wav -i %1/EN_MIN_G#.wav -i %1/EN_MIN_A.wav -i %1/EN_MIN_A#.wav -i %1/EN_MIN_B.wav -filter_complex "[0:0][1:0][2:0][3:0][4:0][5:0][6:0][7:0][8:0][9:0][10:0][11:0]concat=n=12:v=0:a=1[out]" -map "[out]" %1_6.wav
.\ffmpeg -i %1/IN_MAJ_C.wav -i %1/IN_MAJ_C#.wav -i %1/IN_MAJ_D.wav -i %1/IN_MAJ_D#.wav -i %1/IN_MAJ_E.wav -i %1/IN_MAJ_F.wav -i %1/IN_MAJ_F#.wav -i %1/IN_MAJ_G.wav -i %1/IN_MAJ_G#.wav -i %1/IN_MAJ_A.wav -i %1/IN_MAJ_A#.wav -i %1/IN_MAJ_B.wav -filter_complex "[0:0][1:0][2:0][3:0][4:0][5:0][6:0][7:0][8:0][9:0][10:0][11:0]concat=n=12:v=0:a=1[out]" -map "[out]" %1_7.wav
.\ffmpeg -i %1/IN_MIN_C.wav -i %1/IN_MIN_C#.wav -i %1/IN_MIN_D.wav -i %1/IN_MIN_D#.wav -i %1/IN_MIN_E.wav -i %1/IN_MIN_F.wav -i %1/IN_MIN_F#.wav -i %1/IN_MIN_G.wav -i %1/IN_MIN_G#.wav -i %1/IN_MIN_A.wav -i %1/IN_MIN_A#.wav -i %1/IN_MIN_B.wav -filter_complex "[0:0][1:0][2:0][3:0][4:0][5:0][6:0][7:0][8:0][9:0][10:0][11:0]concat=n=12:v=0:a=1[out]" -map "[out]" %1_8.wav


.\ffmpeg -i %1/INT3.wav -i %1/END3.wav -i %1_1.wav -i %1_2.wav -i %1_3.wav -i %1_4.wav -i %1_5.wav -i %1_6.wav -i %1_7.wav -i %1_8.wav  -filter_complex "[0:0][1:0][2:0][3:0][4:0][5:0][6:0][7:0][8:0][9:0]concat=n=10:v=0:a=1[out]" -map "[out]" %1.ogg

del %1_1.wav
del %1_2.wav
del %1_3.wav
del %1_4.wav
del %1_5.wav
del %1_6.wav
del %1_7.wav
del %1_8.wav
