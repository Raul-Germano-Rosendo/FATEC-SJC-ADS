# pip install pytest
import pytest
from aluno import Aluno


def test_calcular_media():
    aluno = Aluno("João", [8.0, 7.0, 9.0])

    assert aluno.calcular_media() == 8.0


def test_media_com_notas_decimais():
    aluno = Aluno("Maria", [7.5, 8.5, 9.0])

    assert aluno.calcular_media() == pytest.approx(8.33, abs=0.01)


def test_aluno_sem_notas():
    aluno = Aluno("Pedro", [])

    assert aluno.calcular_media() == 0.0